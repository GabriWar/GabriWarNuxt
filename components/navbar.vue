<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="txtanim link-color link-off" to="/" active-class="link-static link-active glitch">PORTFOLIO
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="txtanim link-color-web" to="/designs/glass" active-class="link-static-web link-active glitch">
          DESIGNS</NuxtLink>
      </li>
      <li>
        <NuxtLink class="txtanim link-color-projects" to="/games" active-class="link-static-projects link-active glitch">
          GAMES</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
@import url(assets/css/navbar.css);
</style>
