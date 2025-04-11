<template>
  <div class="games-page">
    <div class="games-controls">
      <NuxtLink to="/" class="back-button">Back to Home</NuxtLink>
      <div class="language-switcher" @click="toggleLanguage">
        {{ currentLanguage === 'en' ? 'EN/BR' : 'BR/EN' }}
      </div>
    </div>
    <GameGuess :currentLanguage="currentLanguage" @language-changed="handleLanguageChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GameGuess from '~/components/gameguess.vue';

const currentLanguage = ref('en');

function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'br' : 'en';
}

function handleLanguageChange(lang) {
  currentLanguage.value = lang;
}
</script>

<style scoped>
.games-page {
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.games-controls {
  display: flex;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-button {
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #555;
}

.language-switcher {
  background-color: #444;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.language-switcher:hover {
  background-color: #666;
}
</style>
