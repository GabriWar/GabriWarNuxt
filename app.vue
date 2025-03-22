<template>
  <div class="wrapperNuxt">
    <NuxtPage />
    <Navbar v-if="!isTestPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isTestPage = computed(() => route.path === '/test');
</script>

<style>
.wrapperNuxt {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  margin: 0;
  padding: 0;
  background-color: #000000;
}

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000000;
}
</style>
