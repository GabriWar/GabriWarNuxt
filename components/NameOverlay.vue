<template>
  <teleport to="body">
    <div class="gw-bgcontainer" @mousemove="handleMouseMove">
      <div class="gw-bg">
        <div class="gw-hover">
          <div class="gw-txtdiv">
            <!-- Intentionally blank to preserve layout -->
          </div>
        </div>
      </div>

      <div
        class="gw-name"
        id="animate"
        @mouseover="animaText('animate', 'Gabriel', 'Guerra')"
      >
        GabriWar
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import animaText from '~/utils/animatext.js';

const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
  document.documentElement.style.setProperty('--x', `${mouseX.value}px`);
  document.documentElement.style.setProperty('--y', `${mouseY.value}px`);
};
</script>

<style scoped>
/* Scoped overlay styles using a gw- prefix to avoid conflicts with global .name rules */
.gw-bgcontainer {
  position: fixed; /* cover the whole viewport */
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* allow clicks to pass through the overlay container so navbar and other page elements remain clickable */
  pointer-events: none;
  z-index: 9999; /* sit above the canvas visually, but not intercept pointer events */
}

.gw-name {
  position: relative;
  margin: 0;
  text-align: center;
  font-size: clamp(40px, 8vw, 85px);
  cursor: pointer;
  z-index: 10000;
  color: white; /* ensure visible */
  -webkit-text-stroke: 1px rgba(0,0,0,0.6);
  user-select: none;
  padding: 0.2rem 0.6rem;
  /* make the name interactive even though the container passes pointer events through */
  pointer-events: auto;
}

/* Make background parts non-interactive so the name receives cursor events */
.gw-bg,
.gw-hover,
.gw-txtdiv {
  pointer-events: none;
}

/* Ensure visibility on small screens where global .name was hidden */
@media screen and (max-width: 800px) {
  .gw-name {
    display: block !important;
  }
}

</style>
