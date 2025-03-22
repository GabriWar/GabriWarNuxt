<template>
  <div class="games-page">
    <GameGuess />
  </div>
</template>

<script setup>
import GameGuess from '~/components/gameguess.vue';
</script>

<style scoped>
.games-page {
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 