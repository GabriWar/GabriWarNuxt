<template>
  <nav class="navbar">
    <ul>
      <li class="txtanim link-color link-off">
        <NuxtLink to="/" active-class="link-static link-active glitch"
          >PORTFOLIO</NuxtLink
        >
      </li>
      <li class="txtanim link-color-web">
        <NuxtLink
          to="/designs/glass"
          active-class="link-static-web link-active glitch"
          >DESIGNS</NuxtLink
        >
      </li>
      <li class="txtanim link-color-projects">
        <NuxtLink
          to="/games"
          active-class="link-static-projects link-active glitch"
          >GAMES</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
@import url(assets/css/navbar.css);
</style>
