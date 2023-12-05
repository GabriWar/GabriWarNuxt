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
        <div class="resume" data-visible="1">
          <a class="txtanim link-color" @click="handleclick('resumetxt')"
            >Resume</a
          >
          <p class="resumetxt" data-visible="0">
            Hello, I'm Gabriel, a passionate Full Stack Developer currently
            studying Computer Science. With a deep-rooted love for Linux, I
            consider myself a power user,I love libre and open-source software.
            My curiosity extends beyond coding, I'm also proficient in image
            manipulation, And my love for debugging apps and modding Android
            phones adds to my technical skills.
          </p>
        </div>
        <div class="WebDev" data-visible="1">
          <a class="txtanim link-color-web" @click="handleclick('resumeWebDev')"
            >WebDev</a
          >
          <p class="resumeWebDev" data-visible="0">
            Proficient in both front-end and back-end technologies, experienced
            with HTML, CSS, JavaScript (<a
              class="txtanim link-color-react"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=javascript&sort="
              >React/Next</a
            >,
            <a
              class="txtanim link-color-vue"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=vue&sort="
              >Vue/Nuxt</a
            >,
            <a
              class="txtanim link-color-rust"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=javascript&sort="
              >Svelte/SvelteKit</a
            >), and server-side scripting languages (<a
              class="txtanim link-color-projects"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=javascript&sort="
              >Node.js</a
            >,
            <a
              class="txtanim link-color-cpp"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=c%2B%2B&sort="
              >C++</a
            >,
            <a
              class="txtanim link-color-rust"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=rust&sort="
              >Rust</a
            >,
            <a
              class="txtanim link-color-py"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=python&sort="
              >Python</a
            >).
          </p>
        </div>
        <div class="linux" data-visible="1">
          <a
            class="txtanim link-color-linux"
            @click="handleclick('resumelinux')"
            >Linux</a
          >
          <p class="resumelinux" data-visible="0">
            Proficient with the
            <a
              class="txtanim link-color-linux"
              href="https://github.com/GabriWar/LARBS"
              >Linux</a
            >
            command line operation, comfortable with
            <a class="txtanim link-color">Shell Scripting</a> and automation,
            adept at optimizing system performance and troubleshooting.
          </p>
        </div>
        <div class="edu" data-visible="1">
          <a class="txtanim link-color-edu" @click="handleclick('resumeedu')"
            >Education</a
          >
          <p class="resumeedu" data-visible="0">
            Currently pursuing a degree in Computer Science, I am dedicated to
            expanding my knowledge and staying at the forefront of technology. I
            also speak Portuguese (native), English (fluent), German (learning).
          </p>
        </div>
        <div class="proj" data-visible="1">
          <a
            class="txtanim link-color-projects projtxt"
            @click="handleclick('resumeproj')"
            >Projects</a
          >
          <!-- had to get an special class for this one -->
          &nbsp
          <p class="resumeproj" data-visible="0">
            <a
              class="txtanim link-color-projects"
              href="https://github.com/GabriWar?tab=repositories&q=&type=source&language=&sort="
              >GitHub</a
            >&nbsp
            <a
              class="txtanim txta\nim link-color-js"
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

<script setup>
import genRandom from '~/utils/genrandom.js';
import animaText from '~/utils/animatext.js';
import { ref } from 'vue';

const randomChars = ref('');
const mouseX = ref(0);
const mouseY = ref(0);

randomChars.value = 'GabriWar'.repeat(1050);

const handleclick = (...cssclasses) => {
  cssclasses.forEach((cssclass) => {
    const element = document.querySelector(`.${cssclass}`);
    if (element.dataset.visible === '0') {
      element.dataset.visible = '1';
    } else if (element.dataset.visible === '1') {
      element.dataset.visible = '0';
      setTimeout(() => {
        element.style.display = 'block';
      }, 5000);
    }
  });
};

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
