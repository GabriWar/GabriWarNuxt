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
.name {
  color: white;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: clamp(40px, 8vw, 85px);
  cursor: pointer;
}
.bgcontainer {
  margin-top: -4rem;
  overflow: visible;
}
.txtdiv {
  position: absolute;
  width: 105%;
  height: 110%;
  color: rgb(94, 93, 93);
  word-break: break-all;
  -webkit-mask-image: radial-gradient(
    circle at center,
    black 10%,
    transparent 50%
  );
  -mask-image: radial-gradient(circle at center, black 10%, transparent 50%);
  font-size: 2rem;
  left: -5%;
}
.txt {
  position: absolute;
  text-align: center;
  width: 110%;
  height: 110%;
  -webkit-mask-image: radial-gradient(
    circle at var(--x) var(--y),
    black 1%,
    transparent 50%
  );
  -mask-image: radial-gradient(
    circle at var(--x) var(--y),
    black 1%,
    transparent 50%
  );
  left: +4.8%;
  top: +2%;
  pointer-events: none;
}
@media screen and (max-width: 768px) {
  .txt {
    -webkit-mask-image: none;
    -mask-image: none;
  }
  .txtdiv {
    -webkit-mask-image: none;
    -mask-image: none;
  }
}
</style>
