<template>
  <div class="bgcontainer" @mousemove="handleMouseMove">
    <div class="bg">
      <div class="hover">
        <div class="txtdiv">
          <p class="txt">{{ randomChars }}</p>
        </div>
      </div>
    </div>
    <div
      class="name"
      id="animate"
      @mouseover="animaText('animate', 'Gabriel', 'Guerra')"
    >
      GabriWar
    </div>
  </div>
</template>

<script setup>
import genRandom from '~/utils/genrandom.js';
import animaText from '~/utils/animatext.js';
import { ref } from 'vue';

const randomChars = ref('');
const mouseX = ref(0);
const mouseY = ref(0);

randomChars.value = 'GabriWar'.repeat(1050);

const handleMouseMove = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
  randomChars.value = genRandom(6000);
  document.documentElement.style.setProperty('--x', `${mouseX.value}px`);
  document.documentElement.style.setProperty('--y', `${mouseY.value}px`);
};
</script>

<style scoped>
@import url(assets/css/bg.css);
</style>
