<template>
  <div class="relative overflow-hidden">
    <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full" />

    <!-- Vignette is now drawn on the canvas for better control and performance -->

    <!-- Name overlay sits above the canvas -->
    <NameOverlay />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'bgglitch' });
import { ref, onMounted, onUnmounted, watch, useTemplateRef } from 'vue';

interface Props {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  vignetteStrength?: number; // 0..1 darkness
  centerRadius?: number; // relative radius for center vignette (0..1)
  outerStart?: number; // relative start for outer vignette (0..1)
}

// helper: convert h,s,l to hex
const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const val = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * val).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const generatePalette = (count = 3) => {
  const palette: string[] = [];
  for (let i = 0; i < count; i++) {
    const h = Math.floor(Math.random() * 360);
    const s = 40 + Math.floor(Math.random() * 40); // 40-80%
    const l = 30 + Math.floor(Math.random() * 30); // 30-60%
    palette.push(hslToHex(h, s, l));
  }
  return palette;
};

const props = withDefaults(defineProps<Props>(), {
  glitchColors: () => [],
  glitchSpeed: 10,
  centerVignette: true,
  outerVignette: true,
  smooth: true,
  vignetteStrength: 0.9,
  centerRadius: 1,
  outerStart: 1
});

// Create an effective palette at runtime (generate if prop not provided)
const initialPalette = generatePalette(3);
const effectiveGlitchColors = ref<string[]>(props.glitchColors && props.glitchColors.length ? props.glitchColors : initialPalette);
watch(() => props.glitchColors, (val) => {
  effectiveGlitchColors.value = (val && val.length) ? val : initialPalette;
});

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');
const animationRef = ref<number | null>(null);
// use a plain array for high-frequency updates to avoid Vue reactivity overhead
type Letter = {
  char: string;
  // store numeric RGB to avoid reparsing hex each frame
  colorRGB: { r: number; g: number; b: number };
  targetRGB: { r: number; g: number; b: number };
  colorProgress: number;
  x?: number;
  y?: number;
};
let lettersArr: Letter[] = [];
const grid = ref({ columns: 0, rows: 0 });
const context = ref<CanvasRenderingContext2D | null>(null);
const lastGlitchTime = ref(Date.now());

const fontSize = 16;
const charWidth = 10;
const charHeight = 20;

const lettersAndSymbols = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
  '!','@','#','$','&','*','(',')','-','_','+','=','/','[',']','{','}',';',':','<','>',',',
  '0','1','2','3','4','5','6','7','8','9'
];

const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];

const getRandomColor = () => {
  const arr = effectiveGlitchColors.value && effectiveGlitchColors.value.length ? effectiveGlitchColors.value : initialPalette;
  return arr[Math.floor(Math.random() * arr.length)];
};

const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
};

const interpolateColorNums = (start: { r: number; g: number; b: number }, end: { r: number; g: number; b: number }, factor: number) => ({
  r: Math.round(start.r + (end.r - start.r) * factor),
  g: Math.round(start.g + (end.g - start.g) * factor),
  b: Math.round(start.b + (end.b - start.b) * factor)
});

const calculateGrid = (width: number, height: number) => ({ columns: Math.ceil(width / charWidth), rows: Math.ceil(height / charHeight) });

const initializeLetters = (columns: number, rows: number) => {
  grid.value = { columns, rows };
  const totalLetters = columns * rows;
  lettersArr = new Array(totalLetters);
  for (let i = 0; i < totalLetters; i++) {
    const c = getRandomChar();
    const colHex = getRandomColor();
    const tgtHex = getRandomColor();
    const colRgb = hexToRgb(colHex) || { r: 255, g: 255, b: 255 };
    const tgtRgb = hexToRgb(tgtHex) || { r: 255, g: 255, b: 255 };
    const colIdx = i % columns;
    const rowIdx = Math.floor(i / columns);
    lettersArr[i] = { char: c, colorRGB: colRgb, targetRGB: tgtRgb, colorProgress: 1, x: colIdx * charWidth, y: rowIdx * charHeight };
  }
};

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const parent = canvas.parentElement;
  if (!parent) return;

  const dpr = window.devicePixelRatio || 1;

  const parentWidth = parent.parentElement?.offsetWidth || parent.offsetWidth || window.innerWidth;
  const parentHeight = parent.parentElement?.offsetHeight || parent.offsetHeight || window.innerHeight;

  const width = Math.max(parentWidth, 300);
  const height = Math.max(parentHeight, 300);

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  if (context.value) {
    context.value.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const { columns, rows } = calculateGrid(width, height);
  initializeLetters(columns, rows);
  // regenerate vignette cache for new size
  regenerateVignette(width, height);
  drawLetters();
};

const drawLetters = () => {
  const ctx = context.value;
  const canvasEl = canvasRef.value;
  if (!ctx || !canvasEl || lettersArr.length === 0) return;
  const dpr = window.devicePixelRatio || 1;
  const width = canvasEl.width / dpr;
  const height = canvasEl.height / dpr;
  ctx.clearRect(0, 0, width, height);
  ctx.font = `${fontSize}px monospace`;
  ctx.textBaseline = 'top';

  for (let i = 0, len = lettersArr.length; i < len; i++) {
  const letter = lettersArr[i];
  const x = letter.x ?? (i % grid.value.columns) * charWidth;
  const y = letter.y ?? Math.floor(i / grid.value.columns) * charHeight;
    // pick rgb: if in transition, compute interpolated numeric rgb
    let r = letter.colorRGB.r;
    let g = letter.colorRGB.g;
    let b = letter.colorRGB.b;
    if (letter.colorProgress < 1) {
      const rgb = interpolateColorNums(letter.colorRGB, letter.targetRGB, letter.colorProgress);
      r = rgb.r; g = rgb.g; b = rgb.b;
    }
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillText(letter.char, x, y);
  }

  // draw vignette overlay from cached offscreen canvas
  try {
    if (vignetteCanvas && vignetteCanvas.width === Math.ceil(width) && vignetteCanvas.height === Math.ceil(height)) {
      ctx.drawImage(vignetteCanvas, 0, 0, width, height);
    } else {
      // fallback: generate on the fly if sizes mismatch
      drawVignette(ctx, width, height);
    }
  } catch (e) {
    // swallow errors to keep animation running
  }
};
// glyph cache removed per user request because it reduced framerate; using fillText directly

const drawVignette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const cx = width / 2;
  const cy = height / 2;
  const maxDim = Math.max(width, height);

  // center vignette: darken center and fade outwards
  if (props.centerVignette) {
    const innerR = Math.max(1, maxDim * 0.001);
    const outerR = Math.max(1, maxDim * props.centerRadius);
    const g = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
    g.addColorStop(0, `rgba(0,0,0,${props.vignetteStrength})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  }

  // outer vignette: transparent center, dark edges
  if (props.outerVignette) {
    const startR = Math.max(1, maxDim * props.outerStart);
    const endR = Math.max(1, maxDim);
    const g2 = ctx.createRadialGradient(cx, cy, startR, cx, cy, endR);
    g2.addColorStop(0, 'rgba(0,0,0,0)');
    g2.addColorStop(1, `rgba(0,0,0,${props.vignetteStrength})`);
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, width, height);
  }
};

// offscreen vignette cache
let vignetteCanvas: HTMLCanvasElement | null = null;
const regenerateVignette = (width: number, height: number) => {
  const dpr = window.devicePixelRatio || 1;
  const cw = Math.ceil(width * dpr);
  const ch = Math.ceil(height * dpr);
  const off = document.createElement('canvas');
  off.width = cw;
  off.height = ch;
  off.style.width = `${width}px`;
  off.style.height = `${height}px`;
  const octx = off.getContext('2d');
  if (!octx) return;
  octx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // draw vignette onto offscreen
  drawVignette(octx, width, height);
  vignetteCanvas = off;
};

const updateLetters = () => {
  if (!lettersArr || lettersArr.length === 0) return;

  const updateCount = Math.max(1, Math.floor(lettersArr.length * 0.03)); // slightly fewer updates
  const len = lettersArr.length;
  for (let i = 0; i < updateCount; i++) {
    const index = Math.floor(Math.random() * len);
    const letter = lettersArr[index];
    if (!letter) continue;
    letter.char = getRandomChar();
    const newHex = getRandomColor();
    const newRgb = hexToRgb(newHex) || letter.targetRGB;
    if (!props.smooth) {
      letter.colorRGB = newRgb;
      letter.targetRGB = newRgb;
      letter.colorProgress = 1;
    } else {
      // start transition from current numeric rgb to newRgb
      letter.targetRGB = newRgb;
      // leave colorRGB as-is (current start)
      letter.colorProgress = 0;
    }
  }

  // insert 'gb' signature occasionally
  const gbChance = 0.05;
  if (Math.random() < gbChance) {
    const total = lettersArr.length;
    const startIdx = Math.floor(Math.random() * total);
    const col = startIdx % grid.value.columns;
    if (col < grid.value.columns - 1) {
      const c1 = lettersArr[startIdx];
      const c2 = lettersArr[startIdx + 1];
      const rgb1 = hexToRgb(getRandomColor()) || c1.colorRGB;
      const rgb2 = hexToRgb(getRandomColor()) || c2.colorRGB;
      c1.char = 'g'; c1.colorRGB = rgb1; c1.targetRGB = rgb1; c1.colorProgress = 1;
      c2.char = 'b'; c2.colorRGB = rgb2; c2.targetRGB = rgb2; c2.colorProgress = 1;
    } else {
      const c = lettersArr[startIdx];
      const rgb = hexToRgb(getRandomColor()) || c.colorRGB;
      c.char = 'g'; c.colorRGB = rgb; c.targetRGB = rgb; c.colorProgress = 1;
    }
  }
};

const handleSmoothTransitions = () => {
  let needsRedraw = false;
  for (let i = 0, len = lettersArr.length; i < len; i++) {
    const letter = lettersArr[i];
    if (letter.colorProgress < 1) {
      letter.colorProgress += 0.06; // slightly faster transition
      if (letter.colorProgress > 1) letter.colorProgress = 1;
      // compute intermediate numeric rgb and store temporarily in colorRGB for drawing
      const rgb = interpolateColorNums(letter.colorRGB, letter.targetRGB, letter.colorProgress);
      // do not overwrite start colorRGB (we keep it as the starting point), so for drawing we'll compute on the fly
      needsRedraw = true;
    }
  }

  if (needsRedraw) drawLetters();
};

const animate = () => {
  const now = Date.now();
  if (now - lastGlitchTime.value >= props.glitchSpeed) {
    updateLetters();
    drawLetters();
    lastGlitchTime.value = now;
  } else if (props.smooth) {
    // smooth transitions need to run at frame rate to look smooth
    handleSmoothTransitions();
  }
  animationRef.value = requestAnimationFrame(animate);
};

// Import the overlay component dynamically so it renders above the canvas
import NameOverlay from '~/components/NameOverlay.vue';

let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout as any);
  resizeTimeout = setTimeout(() => {
    if (animationRef.value) {
      cancelAnimationFrame(animationRef.value);
    }
    resizeCanvas();
    animate();
  }, 100) as ReturnType<typeof setTimeout>;
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  context.value = canvas.getContext('2d');
  resizeCanvas();
  animate();

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationRef.value) {
    cancelAnimationFrame(animationRef.value);
  }
  window.removeEventListener('resize', handleResize);
});

watch([() => props.glitchSpeed, () => props.smooth], () => {
  if (animationRef.value) {
    cancelAnimationFrame(animationRef.value);
  }
  animate();
});

// regenerate vignette if relevant props change
watch([() => props.vignetteStrength, () => props.centerRadius, () => props.outerStart, () => props.centerVignette, () => props.outerVignette], () => {
  const canvasEl = canvasRef.value;
  if (!canvasEl) return;
  const dpr = window.devicePixelRatio || 1;
  const width = canvasEl.width / dpr;
  const height = canvasEl.height / dpr;
  regenerateVignette(width, height);
});
</script>

<style scoped>
div {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

:deep(canvas) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
