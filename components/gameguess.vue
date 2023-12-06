<template>
  <title>Guessing Game</title>
    <div class="bttn-translate" @click="translatetext">BR/EN</div>
  <div class="bg">
    <h1 data-translate="Adivinhe o número">Guess the Number</h1>
    <div class="game">
      <p data-translate="Clique para começar o jogo" v-if="!gameStarted">Click the button to start the game</p>
      <button data-translate="Começar" v-if="!gameStarted" @click="startGame">Start Game</button>
      <p data-translate="Adivinhe o número de 0 a 100:" v-if="gameStarted && !gameOver">Guess a number between 0 and 100:</p>
      <input
        v-model="guess"
        v-if="gameStarted && !gameOver"
        type="number"
        min="1"
        max="100"
        @keyup.enter="checkGuess"
      />
      <button data-translate="Enviar" v-if="gameStarted && !gameOver" @click="checkGuess">Enter</button>
      <p v-if="gameOver">You guessed the number in {{ attempts }} attempts.</p>
      <p class="lower" data-translate="O número é menor" v-if="!gameOver && higher">The number is lower</p>
      <p class="higher" data-translate="O número é maior" v-if="!gameOver && lower">The number is higher</p>
      <p >Attempts: {{ attempts }}</p>
      <p v-if="gameOver">Time: {{ milliseconds }} milliseconds</p>
      <p v-if="gameOver">Score: {{ milliseconds * attempts }}</p>
      <p class="aviso1" v-if="gameOver">Score = time * attempts</p>
    </div>

    <input
      v-model="playerName"
      v-if="gameOver"
      type="text"
      placeholder="Name"
      class="input"
    />
    <button data-translate="Enviar" v-if="gameOver" @click="sendScore">Submit</button>
    <p class="aviso2" v-if="gameOver">No special characters, please :)</p>
    <table class="table" v-if="highScores.length > 0">
      <div class="tablecontainer">
        <thead>
          <tr>
            <th data-translate="Rank">Rank</th>
            <th data-translate="Nome">Name</th>
            <th data-translate="Pts">Pts</th>
            <th data-translate="Tempo">Time</th>
            <th data-translate="Tentativas">Attempts</th>
          </tr>
        </thead>
        <tbody style="text-align: center">
          <tr v-for="(score, index) in highScores" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ score.names }}</td>
            <td>{{ score.scores }}</td>
            <td>{{ score.time }}</td>
            <td>{{ score.tentativas }}</td>
          </tr>
        </tbody>
      </div>
    </table>
    <p data-translate="Carregando pontuações" v-else>Loading scores</p>
  </div>
  <div class="credits">
    <a href="https://github.com/GabriWar">Gabriel Guerra</a>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import translatetext from '~/utils/translate.js';
const client = useSupabaseClient();
const targetNumber = Math.floor(Math.random() * 100) + 1;
const guess = ref('');
const playerName = ref('');
const attempts = ref(0);
const gameOver = ref(false);
const higher = ref(false);
const lower = ref(false);
const highScores = ref([]);
const gameStarted = ref(false);
const timer = ref(null);
const milliseconds = ref(0);

async function fetchHighScores() {
  const { data, error } = await client
    .from('scores')
    .select('*')
    .order('scores', { ascending: true })
    .limit(30);
  if (error) {
    console.error(error);
  } else {
    highScores.value = data;
  }
}

onMounted(fetchHighScores);

function startGame() {
  gameStarted.value = true;
  startTimer();
}

function startTimer() {
  timer.value = setInterval(() => {
    milliseconds.value++;
  }, 1);
}

function checkGuess() {
  attempts.value++;

  if (parseInt(guess.value) === targetNumber) {
    gameOver.value = true;
    console.log(timer.value);
    clearInterval(timer.value);
  } else if (parseInt(guess.value) > targetNumber) {
    higher.value = true;
    lower.value = false;
  } else {
    higher.value = false;
    lower.value = true;
  }
}

async function sendScore() {
  gameOver.value = true;
  const playerNameRegex = /^[a-zA-Z0-9\s]+$/;

  if (!playerNameRegex.test(playerName.value)) {
    console.error('nome invalido');
    return;
  }

  if (playerName.value.length > 15) {
    console.error('nome muito longo');
    return;
  }

  const { error } = await client.from('scores').insert([
    {
      names: playerName.value,
      scores: milliseconds.value * attempts.value,
      time: milliseconds.value,
      tentativas: attempts.value,
    },
  ]);
  if (error) {
    console.error(error);
  } else {
    console.log('score enviada');
    fetchHighScores();
    location.reload();
  }
}
</script>

<style scoped>
@import url(assets/css/gameguess.css);
</style>
