<template>
  <div class="all" @mousemove="handleMouseMove">
    <div class="bgcontainer">
      <bg />

      <div class="bttn-translate" @click="translatetext">BR/EN</div>
    </div>

    <div class="txtcontainer">
      <div class="resumeEN">
        <div class="resume" data-visible="1">
          <a
            class="txtanim link-color"
            data-translate="Resumo"
            @click="handleclick('resumetxt')"
            >Resume</a
          >
          <p
            class="resumetxt"
            data-visible="0"
            data-translate="Olá, eu sou o Gabriel, um entusiasta Desenvolvedor Full Stack que atualmente está estudando Ciência da Computação. Com um amor profundo pelo Linux, me considero um usuário avançado. Eu adoro software livre e de código aberto. Minha curiosidade vai além da programação; também sou habilidoso em manipulação de imagens. Além disso, meu amor por debugar aplicativos e fazer modificações em telefones Android contribui para minhas habilidades técnicas."
          >
            Hello, I'm Gabriel, a passionate Full Stack Developer currently
            studying Computer Science. With a deep-rooted love for Linux, I
            consider myself a power user,I love libre and open-source software.
            My curiosity extends beyond coding, I'm also proficient in image
            manipulation, And my love for debugging apps and modding Android
            phones adds to my technical skills.
          </p>
        </div>
        <div class="WebDev" data-visible="1">
          <a
            class="txtanim link-color-web"
            data-translate="WebDev"
            @click="handleclick('resumeWebDev')"
            >WebDev</a
          >
          <p
            class="resumeWebDev"
            data-visible="0"
            data-translate="Proficiente tanto nas tecnologias de front-end quanto de back-end, com experiência em HTML, CSS e JavaScript (React/Next, Vue/Nuxt, Svelte/SvelteKit), e linguagens server-side/BackEnd (Node.js, C++, Rust, Python)."
          >
            Proficient in both front-end and back-end technologies, experienced
            with HTML, CSS, JavaScript (<a
              class="txtanim link-color-react"
              to="/links/2"
              >React/Next</a
            >,
            <NuxtLink class="txtanim link-color-vue" to="/links/3"
              >Vue/Nuxt</NuxtLink
            >,
            <NuxtLink class="txtanim link-color-rust" to="/links/2"
              >Svelte/SvelteKit</NuxtLink
            >), and server-side scripting languages (<a
              class="txtanim link-color-projects"
              to="/links/2"
              >Node.js</a
            >,
            <NuxtLink class="txtanim link-color-cpp" to="/links/4">C++</NuxtLink
            >,
            <NuxtLink class="txtanim link-color-rust" to="/links/5"
              >Rust</NuxtLink
            >,
            <NuxtLink class="txtanim link-color-py" to="/links/6"
              >Python</NuxtLink
            >).
          </p>
        </div>
        <div class="linux" data-visible="1">
          <a
            class="txtanim link-color-linux"
            data-translate="Linux"
            @click="handleclick('resumelinux')"
            >Linux</a
          >
          <p
            class="resumelinux"
            data-visible="0"
            data-translate="Proficiente com o terminal linux, confortavel com a operação na linha de comando, Shell Scripting, e automação, habilidoso em optimização de performance e troubleshooting"
          >
            Proficient with the
            <NuxtLink class="txtanim link-color-linux" to="/links/7"
              >Linux</NuxtLink
            >
            command line operation, comfortable with
            <a class="txtanim link-color">Shell Scripting</a> and automation,
            adept at optimizing system performance and troubleshooting.
          </p>
        </div>
        <div class="edu" data-visible="1">
          <a
            class="txtanim link-color-edu"
            data-translate="Educação"
            @click="handleclick('resumeedu')"
            >Education</a
          >
          <p
            class="resumeedu"
            data-visible="0"
            data-translate="Atualmente cursando uma graduação em Ciência da Computação, estou dedicado(a) a ampliar meu conhecimento e permanecer à frente da tecnologia. Também falo português (nativo), inglês (fluente) e estou aprendendo alemão."
          >
            Currently pursuing a degree in Computer Science, I am dedicated to
            expanding my knowledge and staying at the forefront of technology. I
            also speak Portuguese (native), English (fluent), German (learning).
          </p>
        </div>
        <div class="proj" data-visible="1">
          <a
            class="txtanim link-color-projects projtxt"
            data-translate="Projetos"
            @click="handleclick('resumeproj')"
            >Projects</a
          >
          <!-- had to get an special class for this one -->
          &nbsp
          <p class="resumeproj" data-visible="0">
            <NuxtLink class="txtanim link-color-projects" to="/links/1"
              >GitHub</NuxtLink
            >&nbsp
            <NuxtLink class="txtanim txta\nim link-color-js" to="/links/2"
              >JavaScript</NuxtLink
            >&nbsp
            <NuxtLink class="txtanim txtanim link-color-py" to="/links/6"
              >Python</NuxtLink
            >&nbsp
            <NuxtLink class="txtanim txtanim link-color-cpp" to="/links/4"
              >C++</NuxtLink
            >&nbsp
            <NuxtLink class="txtanim txtanim link-color-rust" to="/links/5"
              >Rust</NuxtLink
            >&nbsp
            <NuxtLink class="txtanim txtanim link-color-react" to="/links/2"
              >React</NuxtLink
            >&nbsp
            <NuxtLink class="txtanim txtanim link-color-vue" to="/links/3"
              >Vue</NuxtLink
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
import translatetext from '~/utils/translate.js';
import bg from '~/components/bg.vue';

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
</script>

<style scoped>
@import url(assets/css/portfolio.css);
@import url(assets/css/glitchanim.css);
</style>