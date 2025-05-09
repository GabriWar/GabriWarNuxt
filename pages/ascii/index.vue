<template>
  <div class="ascii-page" @contextmenu.prevent>
    <div ref="asciiContainer" class="ascii-container"></div>
    <div class="controls" v-show="showControls">
      <button @click="start" :class="{ active: isRunning }">Start</button>
      <button @click="stop" :class="{ active: !isRunning }">Stop</button>
      <button @click="reset">Reset</button>
      <button @click="toggleRain" :class="{ active: rainEnabled }">
        {{ rainEnabled ? "Rain On" : "Rain Off" }}
      </button>
      <NuxtLink to="/" class="back-button">Back</NuxtLink>
    </div>
    <div v-if="typedText" class="typing-preview">{{ typedText }}</div>
  </div>
</template>

<script>
export default {
  name: "AsciiPage",
  data() {
    return {
      fallingText: null,
      isRunning: false,
      rainEnabled: true,
      typedText: "",
      typingTimeout: null,
      showControls: false,
    };
  },
  mounted() {
    this.initFallingText();
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeyPress);
    if (this.fallingText) {
      this.fallingText.stop();
    }
  },
  methods: {
    initFallingText() {
      const container = this.$refs.asciiContainer;
      this.fallingText = new ASCIIFallingText(container, {
        gravity: 0.8,
        friction: 0.3,
        fps: 120,
        freezeTime: 2000,
        randomizationChance: 0.03,
      });

      let banner = `                                                  
unsigned __int64 sub_7910(char *format, (...)
{void *v1; r14 int v2; eax size_t v3; r15
 char v4; al __int16 v5; r15
 char v6; al unsigned __int64 v7; r12
 void (__fastcall *v8)(void *); 
 FILE *v9; r15 BYREF rax
 gcc_va_list va1; [rsp+B0h] [rbp-80h]
 gcc_va_list va2; [rsp+D0h] [rbp-60h]
 gcc_va_list arg; [rsp+F0h] [rbp-40h] 
 unsigned __int64 v14; [rsp+108h] [rbp-28h]}
`;
      function scrambleWords(input) {
        // Split the input by lines to preserve newlines
        let lines = input.split("\n");

        // Function to scramble the words in a line
        function scrambleLine(line) {
          let words = line.split(" ");
          // Shuffle the words
          for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]]; // Swap words
          }
          return words.join(" ");
        }

        // Scramble each line's words
        let scrambledLines = lines.map(scrambleLine);

        // Join the scrambled lines back with newlines
        return scrambledLines.join("\n");
      }

      const showcredits = true;
      if (showcredits) {
        this.fallingText.addText(
          "@GabriWar",
          Math.floor(
            Math.random() *
              (this.fallingText.options.width - "@GabriWar".length)
          ),
          0,
          true
        );
        this.fallingText.addText(
          "PRESS SPACE TO SHOW MENU!!",
          Math.floor(
            Math.random() *
              (this.fallingText.options.width - "@PRESS SPACE TO SHOW MENU!!".length)
          ),
          0,
          true
        );
      }
      const mathrandom = Math.floor(Math.random() * 100);
      if (mathrandom < 30) {
        this.fallingText.addText(
          scrambleWords(banner),
          Math.floor(Math.random() * (this.fallingText.options.width - 43)),
          Math.floor(Math.random() * (this.fallingText.options.height - 14)),
          true
        );
      }

      this.start();
    },
    start() {
      if (this.fallingText) {
        this.fallingText.start();
        this.isRunning = true;
      }
    },
    stop() {
      if (this.fallingText) {
        this.fallingText.stop();
        this.isRunning = false;
      }
    },
    reset() {
      if (this.fallingText) {
        this.fallingText.reset();
        this.start();
      }
    },
    toggleRain() {
      if (this.fallingText) {
        this.rainEnabled = this.fallingText.toggleRain();
      }
    },
    handleResize() {
      if (this.fallingText) {
        this.fallingText.handleResize();
      }
    },
    handleKeyPress(e) {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "BUTTON"
      ) {
        return;
      }

      if (e.key === " ") {
        this.showControls = !this.showControls;
        return;
      }

      if (e.key === "Enter") {
        if (this.typedText.length > 0) {
          const x = Math.floor(
            Math.random() *
              (this.fallingText.options.width - this.typedText.length)
          );
          const y = Math.floor(
            Math.random() * (this.fallingText.options.height / 3)
          );
          this.fallingText.addText(this.typedText, x, y, true);
          this.typedText = "";
        }
        return;
      }

      if (e.key === "Escape") {
        this.typedText = "";
        return;
      }

      if (e.key === "Backspace" && this.typedText.length > 0) {
        this.typedText = this.typedText.slice(0, -1);
        return;
      }

      if (e.key.length === 1) {
        this.typedText += e.key;

        if (this.typingTimeout) {
          clearTimeout(this.typingTimeout);
        }

        this.typingTimeout = setTimeout(() => {
          if (this.typedText.length > 0) {
            const x = Math.floor(
              Math.random() *
                (this.fallingText.options.width - this.typedText.length)
            );
            const y = Math.floor(
              Math.random() * (this.fallingText.options.height / 3)
            );
            this.fallingText.addText(this.typedText, x, y, true);
            this.typedText = "";
          }
        }, 3000);
      }
    },
  },
};

// ASCII Falling Text Class
class ASCIIFallingText {
  constructor(container, options = {}) {
    this.options = {
      gravity: options.gravity || 1,
      friction: options.friction || 0.4,
      fps: options.fps || 60,
      freezeTime: options.freezeTime || 2000,
      randomizationChance: options.randomizationChance || 0.05,
      ...options,
    };

    this.container = container;
    this.grid = [];
    this.frozenCells = new Map();
    this.velocities = new Map();
    this.rainEnabled = true;
    this.intervalId = null;
    this.rainIntervalId = null;
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / this.options.fps;

    this.isDragging = false;
    this.isRightDragging = false;
    this.lastDragPos = { x: -1, y: -1 };
    this.lastClickTime = 0;

    // Create display element first
    this.setupDisplay();

    // Then calculate dimensions and initialize grid
    this.calculateDimensions();
    this.initializeGrids();
  }

  calculateDimensions() {
    const charWidth = 7;
    const charHeight = 14;

    const containerRect = this.container.getBoundingClientRect();

    this.options.width = Math.floor((containerRect.width / charWidth) * 0.9);
    this.options.height = Math.floor(containerRect.height / charHeight);

    this.options.width = Math.max(this.options.width, 10);
    this.options.height = Math.max(this.options.height, 5);

    // Update display size to use full container
    this.display.style.width = "100%";
    this.display.style.height = "100%"; //align to center
    this.display.style.textAlign = "center";
  }

  initializeGrids() {
    this.grid = new Array(this.options.height);
    for (let y = 0; y < this.options.height; y++) {
      this.grid[y] = new Uint8Array(this.options.width).fill(32);
    }
  }

  setupDisplay() {
    if (!this.container) {
      this.container = document.createElement("div");
      document.body.appendChild(this.container);
    }

    this.display = document.createElement("pre");
    this.display.style.width = "100%";
    this.display.style.height = "100%";

    this.container.innerHTML = "";
    this.container.appendChild(this.display);

    this.display.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this),
      { passive: true }
    );
    this.display.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this),
      { passive: true }
    );
    this.display.addEventListener("mouseup", this.handleMouseUp.bind(this), {
      passive: true,
    });
    this.display.addEventListener("contextmenu", (e) => e.preventDefault(), {
      passive: true,
    });
  }

  updateDisplaySize() {
    this.display.style.width = "100%";
    this.display.style.height = "100%";
  }

  handleResize() {
    const previousWidth = this.options.width;
    const previousHeight = this.options.height;

    this.calculateDimensions();

    if (
      Math.abs(previousWidth - this.options.width) > 3 ||
      Math.abs(previousHeight - this.options.height) > 3
    ) {
      this.stop();
      this.initializeGrids();
      this.frozenCells.clear();
      this.velocities.clear();
      this.updateDisplaySize();
      this.render();
      this.start();
    }
  }

  addText(text, x = 0, y = 0, freeze = false) {
    const lines = text.split("\n");
    const frozenPositions = [];

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const targetY = y + lineIndex;

      if (targetY >= this.options.height) continue;

      for (let i = 0; i < line.length; i++) {
        const targetX = x + i;
        if (targetX >= this.options.width) continue;

        this.grid[targetY][targetX] = line.charCodeAt(i);

        if (freeze) {
          frozenPositions.push({ x: targetX, y: targetY });
        }
      }
    }

    if (freeze && frozenPositions.length > 0) {
      const now = Date.now();
      frozenPositions.forEach((pos) => {
        this.frozenCells.set(
          `${pos.x},${pos.y}`,
          now + this.options.freezeTime
        );
      });
    }

    this.render();
  }

  clearText() {
    this.initializeGrids();
    this.frozenCells.clear();
    this.velocities.clear();
    this.render();
  }

  isFrozen(x, y) {
    const key = `${x},${y}`;
    const now = Date.now();
    const freezeTime = this.frozenCells.get(key);

    if (freezeTime && freezeTime > now) {
      return true;
    } else if (freezeTime) {
      this.frozenCells.delete(key);
    }

    return false;
  }

  applyAutomataRules() {
    const randomValues = new Float32Array(this.options.width);
    for (let i = 0; i < this.options.width; i++) {
      randomValues[i] = Math.random();
    }

    for (let y = this.options.height - 2; y >= 0; y--) {
      const currentRow = this.grid[y];
      const nextRow = this.grid[y + 1];

      for (let x = 0; x < this.options.width; x++) {
        const current = currentRow[x];

        if (current === 32 || this.isFrozen(x, y)) continue;

        const below = nextRow ? nextRow[x] : null;
        const randomValue = randomValues[x];
        const key = `${x},${y}`;
        const velocity = this.velocities.get(key) || { x: 0, y: 0 };

        if (velocity.x !== 0 || velocity.y !== 0) {
          const newX = Math.round(x + velocity.x);
          const newY = Math.round(y + velocity.y);

          if (
            newX >= 0 &&
            newX < this.options.width &&
            newY >= 0 &&
            newY < this.options.height &&
            this.grid[newY][newX] === 32
          ) {
            this.grid[newY][newX] = current;
            this.grid[y][x] = 32;
            this.velocities.set(`${newX},${newY}`, velocity);
            this.velocities.delete(key);
            continue;
          }

          velocity.x *= 0.8;
          velocity.y *= 0.8;
          this.velocities.set(key, velocity);
        }

        if (randomValue < this.options.randomizationChance) {
          const direction = Math.random() < 0.5 ? -1 : 1;
          const newX = x + direction;

          if (
            newX >= 0 &&
            newX < this.options.width &&
            currentRow[newX] === 32
          ) {
            currentRow[newX] = current;
            currentRow[x] = 32;
            continue;
          }
        }

        if (below === 32 && randomValue < this.options.gravity) {
          nextRow[x] = current;
          currentRow[x] = 32;
          continue;
        }

        if (below !== 32 && randomValue < this.options.friction) {
          const slideRandom = Math.random();
          const directions = slideRandom < 0.5 ? [-1, 1] : [1, -1];

          if (Math.random() < 0.8) {
            for (const direction of directions) {
              const newX = x + direction;

              if (
                newX >= 0 &&
                newX < this.options.width &&
                currentRow[newX] === 32 &&
                (y + 1 >= this.options.height || nextRow[newX] !== 32)
              ) {
                currentRow[newX] = current;
                currentRow[x] = 32;
                break;
              }
            }
          }
        }
      }
    }
  }

  render() {
    const rows = new Array(this.options.height);
    for (let y = 0; y < this.options.height; y++) {
      rows[y] = String.fromCharCode.apply(null, this.grid[y]);
    }
    this.display.textContent = rows.join("\n");
  }

  start() {
    if (this.intervalId) return;

    const animate = (timestamp) => {
      if (timestamp - this.lastFrameTime >= this.frameInterval) {
        this.applyAutomataRules();
        this.render();
        this.lastFrameTime = timestamp;
      }
      this.intervalId = requestAnimationFrame(animate);
    };

    this.intervalId = requestAnimationFrame(animate);
    this.startRain();
  }

  startRain() {
    if (this.rainEnabled && !this.rainIntervalId) {
      this.rainIntervalId = setInterval(() => {
        this.addRandomRain();
      }, 100);
    }
  }

  stopRain() {
    if (this.rainIntervalId) {
      clearInterval(this.rainIntervalId);
      this.rainIntervalId = null;
    }
  }

  toggleRain() {
    this.rainEnabled = !this.rainEnabled;
    if (this.rainEnabled) {
      this.startRain();
    } else {
      this.stopRain();
    }
    return this.rainEnabled;
  }

  stop() {
    if (this.intervalId) {
      cancelAnimationFrame(this.intervalId);
      this.intervalId = null;
    }
    this.stopRain();
  }

  reset() {
    this.stop();
    this.clearText();
  }

  screenToGrid(clientX, clientY) {
    const rect = this.display.getBoundingClientRect();
    const charWidth = rect.width / this.options.width;
    const charHeight = rect.height / this.options.height;

    return {
      x: Math.floor((clientX - rect.left) / charWidth),
      y: Math.floor((clientY - rect.top) / charHeight),
    };
  }

  handleMouseDown(e) {
    const pos = this.screenToGrid(e.clientX, e.clientY);
    this.lastDragPos = pos;

    if (e.button === 2) {
      e.preventDefault();
      this.isRightDragging = true;
      this.deleteCharsAt(pos.x, pos.y);
    } else if (e.button === 0) {
      this.isDragging = true;
      this.addCharsAt(pos.x, pos.y);
    }
  }

  handleMouseMove(e) {
    if (!this.isDragging && !this.isRightDragging) return;

    const pos = this.screenToGrid(e.clientX, e.clientY);

    if (pos.x === this.lastDragPos.x && pos.y === this.lastDragPos.y) {
      return;
    }

    this.lastDragPos = pos;

    if (this.isRightDragging) {
      this.deleteCharsAt(pos.x, pos.y);
    } else if (this.isDragging) {
      this.addCharsAt(pos.x, pos.y);
    }
  }

  handleMouseUp() {
    this.isDragging = false;
    this.isRightDragging = false;
  }

  addCharsAt(x, y, radius = 2) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>+-*/=.,;:_$#@!?";
    const charsLength = chars.length;

    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const tx = x + dx;
        const ty = y + dy;

        if (
          tx >= 0 &&
          tx < this.options.width &&
          ty >= 0 &&
          ty < this.options.height &&
          dx * dx + dy * dy <= radius * radius
        ) {
          this.grid[ty][tx] = chars.charCodeAt(
            Math.floor(Math.random() * charsLength)
          );
        }
      }
    }

    this.render();
  }

  deleteCharsAt(x, y, radius = 2) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const tx = x + dx;
        const ty = y + dy;

        if (
          tx >= 0 &&
          tx < this.options.width &&
          ty >= 0 &&
          ty < this.options.height &&
          dx * dx + dy * dy <= radius * radius
        ) {
          this.grid[ty][tx] = 32;
          this.frozenCells.delete(`${tx},${ty}`);
        }
      }
    }

    this.render();
  }

  addRandomRain() {
    if (!this.rainEnabled) return;

    const topRow = this.grid[0];
    const codingChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>+-*/=.,;:_$#@!?";
    const codingCharsLength = codingChars.length;

    const positions = [];
    const charIndices = new Uint8Array(this.options.width);

    for (let x = 0; x < this.options.width; x++) {
      if (topRow[x] === 32 && Math.random() < 0.05) {
        positions.push(x);
        charIndices[x] = Math.floor(Math.random() * codingCharsLength);
      }
    }

    for (let i = 0; i < positions.length; i++) {
      const x = positions[i];
      topRow[x] = codingChars.charCodeAt(charIndices[x]);
    }
  }
}
</script>

<style scoped>
@import url(assets/css/ascii.css);
</style>