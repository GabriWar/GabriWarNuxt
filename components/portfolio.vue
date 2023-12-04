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
          <div class="resume">
            <a class="txtanim link-color">Resume</a>

            <p>
              Hello, I'm Gabriel, a passionate Full Stack Developer currently
              studying Computer Science. With a deep-rooted love for Linux, I
              consider myself a power user,I love libre and open-source
              software. My curiosity extends beyond coding, I'm also proficient
              in image manipulation, And my love for debugging apps and modding
              Android phones adds to my technical skills.
            </p>
          </div>
          <div class="WebDev">
            <a class="txtanim link-color-web">WebDev</a>
            <p>
              Proficient in both front-end and back-end technologies,
              experienced with HTML, CSS, JavaScript (<a
                class="txtanim link-color-react"
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
          </div>
          <div class="education">
            <a class="txtanim txtanim link-color-edu">Education</a>
            <p>
              Currently pursuing a degree in Computer Science, I am dedicated to
              expanding my knowledge and staying at the forefront of technology.
              I also speak Portuguese (native), English (fluent), German
              (learning).
            </p>
          </div>
          <div class="projects">
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
@import url(assets/css/portfolio.css);
</style>
