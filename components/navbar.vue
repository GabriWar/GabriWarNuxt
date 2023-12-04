<template>
    <div>
        <nav class="navbar">
            <ul>
                <li class="txtanim link-color link-off"><NuxtLink to="/" active-class="link-static link-active glitch" >PORTFOLIO</NuxtLink></li>
                <li class="txtanim link-color-web"><NuxtLink to="/designs/glass" active-class="link-static-web link-active glitch">DESIGNS</NuxtLink></li>
                <li class="txtanim link-color-projects" ><NuxtLink to="/games" active-class="link-static-projects link-active glitch">GAMES</NuxtLink></li>
            </ul>
        </nav>
    </div>
</template>

<script setup></script>

<style scoped>
@import url(assets/css/hoveranim.css);
@import url(assets/css/glitchanim.css);
.navbar {
    position: fixed;
    z-index: 1;
    bottom: 0;
    width: 100%;
    left: -5px;
    padding: 6px;
    opacity: 80%;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s;
}

.navbar:hover {
    opacity: 100%;
}

.navbar ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.navbar li {
    margin: 0;
}

.navbar a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
}
.link-active {
    font-size: 1rem;
    animation: glitch 2s steps(100) infinite, increaseFontSize 0.4s forwards;

}
.link-off{
}


@keyframes increaseFontSize {
    0% {
        font-size: 1rem;
    }
    50% {
        font-size: 2rem;
    }
    100% {
        font-size: 1.5rem;
    }
}
@media screen and (max-width: 800px) {
    .navbar {
        padding: 0;
               position: fixed;
               bottom: 0;

    }
    .navbar ul {
        gap: 10px;
    }
    .navbar a {
        font-size: 0.8rem;
    }
}
</style>
