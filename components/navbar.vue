<template>
  <nav v-if="!isAsciiPage" class="navbar">
    <ul>
      <li>
        <NuxtLink class="txtanim link-color link-off" to="/" active-class="link-static link-active glitch">PORTFOLIO
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="txtanim link-color-web" to="/designs/glass" active-class="link-static-web link-active glitch">
          DESIGNS</NuxtLink>
      </li>
      <li>
        <NuxtLink class="txtanim link-color-rust" to="/games" active-class="link-static-projects link-active glitch">
          GAMES</NuxtLink>
      </li>
      <li>
        <NuxtLink class="txtanim link-color-projects" to="/aigesture" active-class="link-static-projects link-active glitch">
          AIGesture</NuxtLink>
      </li>
      <li>
        <NuxtLink class="txtanim link-color-projects" to="/ascii" active-class="link-static-projects link-active glitch">
          ASCII</NuxtLink>
      </li>

    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAsciiPage = computed(() => route.path === '/ascii')
</script>

<style scoped>
@import url(assets/css/navbar.css);
</style>
