<template>
    <div class="aigesture-page">
        <AIGesture />
    </div>
</template>

<script setup>
import AIGesture from '~/components/aigesture.vue';
</script>

<style scoped>
.aigesture-page {
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}

@media screen and (max-width: 800px) {
    .aigesture-page {
        height: 100dvh;
        padding: 1rem;
    }
}

@media screen and (max-width: 480px) {
    .aigesture-page {
        padding: 0.5rem;
    }
}
</style>