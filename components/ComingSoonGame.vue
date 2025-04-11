<template>
  <div class="coming-soon-container">
    <h1>Action Game</h1>
    <div class="coming-soon-content">
      <div class="feature-list">
        <h2>Coming Soon!</h2>
        <p>{{ message }}</p>
      </div>
      
      <div class="preview-image" @click="showDetails">
        <div class="game-icon">
          <div class="icon-inner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Click for more information');

function showDetails() {
  message.value = "This will be a real-time WebSockets action game. Stay tuned!";
  
  // Reset after 5 seconds
  setTimeout(() => {
    message.value = 'Click for more information';
  }, 5000);
}
</script>

<style scoped>
.coming-soon-container {
  width: 100%;
  max-width: 900px;
  min-height: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.coming-soon-content {
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  margin-bottom: 40px;
  justify-content: center;
}

.feature-list {
  flex: 1;
  text-align: center;
  max-width: 500px;
}

.feature-list h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #ff6b6b;
}

.feature-list p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.preview-image {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.game-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.game-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.icon-inner {
  width: 40px;
  height: 40px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  background-color: white;
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .coming-soon-content {
    flex-direction: column;
  }
  
  .feature-list {
    width: 100%;
  }
}
</style>