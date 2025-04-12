<template>
  <div class="games-page">
    <div class="games-controls">
      <NuxtLink to="/" class="back-button" data-translate="Voltar para a Página Inicial">Back to Home</NuxtLink>
      <div class="language-switcher" @click="toggleLanguage">
        {{ currentLanguage === 'en' ? 'EN/BR' : 'BR/EN' }}
      </div>
    </div>

    <!-- Game selector component (shown only when no game is selected) -->
    <GameSelector v-if="!selectedGame" @gameSelected="selectGame" />

    <!-- Game container that shows when a game is selected -->
    <div v-if="selectedGame" class="game-container">
      <div class="game-header">
        <button class="back-to-games" @click="selectedGame = null" data-translate="← Voltar para os Jogos">← Back to Games</button>
      </div>
      
      <!-- Show the appropriate game based on selection -->
      <GuessingGame v-if="selectedGame === 'guess'" :currentLanguage="currentLanguage" @language-changed="handleLanguageChange" />
      <ComingSoonGame v-if="selectedGame === 'memory'" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import GameSelector from '~/components/GameSelector.vue';
import GuessingGame from '~/components/GuessingGame.vue';
import ComingSoonGame from '~/components/ComingSoonGame.vue';
import translatetext from '~/utils/translate.js';

const currentLanguage = ref('en');
const selectedGame = ref(null);

// Call translation function when language changes
watch(currentLanguage, (newLang) => {
  // Small delay to ensure DOM is updated
  setTimeout(() => {
    translatetext();
  }, 10);
});

function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'br' : 'en';
}

function handleLanguageChange(lang) {
  currentLanguage.value = lang;
}

function selectGame(game) {
  selectedGame.value = game;
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
}

.games-controls {
  display: flex;
  width: 100%;
  max-width: 1000px;
  justify-content: space-between;
  margin-bottom: 30px;
}

.back-button, .back-to-games {
  background-color: #333;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  cursor: pointer;
  border: none;
}

.back-button:hover, .back-to-games:hover {
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

.game-container {
  width: 100%;
  max-width: 1000px;
}

.game-header {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

@media (max-width: 768px) {
  .games-controls {
    padding: 0 10px;
  }
}
</style>
