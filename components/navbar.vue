<template>
  <nav v-if="!isAsciiPage" class="navbar">
    <ul>
      <li>
        <NuxtLink class="txtanim link-color-projects" to="/AI" active-class="link-static-projects link-active glitch">
          AI</NuxtLink>
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
const isAsciiPage = computed(() => route.path.startsWith('/ascii'))
</script>

<style scoped>
@import url(assets/css/navbar.css);
</style>
