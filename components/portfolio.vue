<template>
  <div class="all" @mousemove="handleMouseMove">
    <div class="bgcontainer">
      <div class="bg">
        <div class="hover">
          <div class="txtdiv">
            <p class="randtxt">{{ randomChars }}</p>
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

    <div class="txtcontainer">
      <div class="resumeEN">
        <div>
          <a class="txtanim link-color">Resume</a>

          <p>
            Hello, I'm Gabriel, a passionate Full Stack Developer currently
            studying Computer Science. With a deep-rooted love for Linux, I
            consider myself a power user,I love libre and open-source software.
            My curiosity extends beyond coding, I'm also proficient in image
            manipulation, And my love for debugging apps and modding Android
            phones adds to my technical skills.
          </p>
          <a class="txtanim link-color-web">WebDev</a>
          <p>
            Proficient in both front-end and back-end technologies, experienced
            with HTML, CSS, JavaScript (<a class="txtanim link-color-react"
              >React/Next</a
            >, <a class="txtanim link-color-vue">Vue/Nuxt</a>,
            <a class="txtanim link-color-rust">Svelte/SvelteKit</a>), and
            server-side scripting languages (<a
              class="txtanim link-color-projects"
              >Node.js</a
            >, <a class="txtanim link-color-cpp">C++</a>,
            <a class="txtanim link-color-rust">Rust</a>,
            <a class="txtanim link-color-py">Python</a>).
          </p>
          <a class="txtanim txtanim link-color-linux">Linux </a>
          <p>
            Proficient with the
            <a class="txtanim link-color-linux">Linux</a> command line
            operation, comfortable with
            <a class="txtanim link-color">Shell Scripting</a> and automation,
            adept at optimizing system performance and troubleshooting.
          </p>

          <a class="txtanim txtanim link-color-edu">Education</a>
          <p>
            Currently pursuing a degree in Computer Science, I am dedicated to
            expanding my knowledge and staying at the forefront of technology. I
            also speak Portuguese (native), English (fluent), German (learning).
          </p>
          <a class="txtanim txtanim link-color-projects">Projects</a>&nbsp
          <p>
            <a
              class="txtanim link-color-projects"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=&sort="
              >GitHub</a
            >&nbsp
            <a
              class="txtanim txtanim link-color-js"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=javascript&sort="
              >JavaScript</a
            >&nbsp
            <a
              class="txtanim txtanim link-color-py"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=python&sort="
              >Python</a
            >&nbsp
            <a
              class="txtanim txtanim link-color-cpp"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=c%2B%2B&sort="
              >C++</a
            >&nbsp
            <a
              class="txtanim txtanim link-color-rust"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=rust&sort="
              >Rust</a
            >&nbsp
            <a
              class="txtanim txtanim link-color-react"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=javascript&sort="
              >React</a
            >&nbsp
            <a
              class="txtanim txtanim link-color-vue"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=vue&sort="
              >Vue</a
            >&nbsp
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(assets/css/hoveranim.css);
.all{
  height: 90vh;
  overflow: hidden;
}
.resumeEN {
  z-index: 1;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  margin-top: 10px;
}
.txtcontainer {
  display: grid;
  grid-template-columns: 1fr;
  font-size: 1.5rem;
  width: 45%;
  padding-top: 48px;
}

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
  z-index: -1;
  margin-top: -4rem;
  overflow: visible;
}
.txtdiv {
  position: absolute;
  height: 100%;
  overflow: hidden;
  color: rgb(94, 93, 93);
  word-break: break-all;
  mask-image: radial-gradient(circle at center, black 10%, transparent 50%);
  -webkit-mask-image: radial-gradient(
    circle at center,
    black 10%,
    transparent 50%
  );
  font-size: 2rem;
}
.randtxt {
  position: absolute;
  text-align: center;
  mask-image: radial-gradient(circle at var(--x) var(--y), black 1%, transparent 50%);
  -webkit-mask-image: radial-gradient(
    circle at var(--x) var(--y),
    black 1%,
    transparent 50%
  );
  left: +4.8%;
  top: +2%;
  pointer-events: none;
}
@media screen and (max-width: 800px) {
  .txt {
    mask-image: none;
    -webkit-mask-image: none;
  }
  .txtdiv {
    mask-image: none;
    -webkit-mask-image: none;
    height: 100vh;
  }
  .txtcontainer {
    width: 100%;
  }
  .randtxt {
    color: rgb(26, 26, 26);
    height: 100vh;
  }
  .name {
    display: none;
  }

}
</style>

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
