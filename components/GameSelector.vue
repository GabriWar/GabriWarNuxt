<template>
  <div class="game-selector">
    <div class="game-selector-header">
      <h1 data-translate="Escolha um Jogo">Choose a Game</h1>
    </div>

    <div class="games-grid">
      <!-- Guessing Game Card -->
      <div class="game-card" @click="selectGame('guess')">
        <div class="game-card-content">
          <h2 data-translate="Adivinhe o Número">Number Guessing</h2>
          <p data-translate="Tente adivinhar o número com o menor número de tentativas!">Try to guess the number with the fewest attempts!</p>
          <div class="game-card-play" data-translate="Jogar Agora">Play Now</div>
        </div>
      </div>
      
      <!-- Coming Soon Game Card -->
      <div class="game-card coming-soon" @click="selectGame('memory')">
        <div class="game-card-content">
          <h2 data-translate="Jogo da Memória">Memory Match</h2>
          <p data-translate="Teste suas habilidades de memória. Combine todos os pares para vencer!">Test your memory skills. Match all the pairs to win!</p>
          <div class="game-card-play" data-translate="Em Breve">Coming Soon</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['gameSelected']);

function selectGame(game) {
  emit('gameSelected', game);
}
</script>

<style scoped>
@import url(assets/css/gameselector.css);
</style>