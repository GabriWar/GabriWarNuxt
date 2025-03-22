<script setup>
import VanillaTilt from 'vanilla-tilt';
</script>

<template>
  <gradient></gradient>
  <div class="wrap">
    <div class="bg"></div>
    <div class="title" gyroscope data-tilt>
      <h1>PROJECTS</h1>
    </div>
    <div class="container">
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>Simple</h2>
          <p>
            My first project, primarily black and white, with some DOS-like
            styling.
          </p>
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <a href="/projects/glass">
            <h2>Glassmorphism</h2>
            <p>Elegant glass design with transparency and some 3D effects</p></a
          >
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>3.</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>Placeholder</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>Placeholder</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>Placeholder</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>Placeholder</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div class="content" gyroscope data-tilt data-tilt-scale="1.1">
        <div class="text">
          <h2>Placeholder</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(assets/css/glass.css);

:root {
  --text: #ffffff;
}

.text {
  color: #ffffff;
}

.text h2, .text p {
  color: #ffffff;
}

.text a {
  color: #ffffff;
}
</style>
