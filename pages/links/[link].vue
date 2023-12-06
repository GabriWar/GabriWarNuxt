<template>
    <div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const route = useRoute();
const link = route.params.link;

const router = useRouter();

if (link === '1') {
    //github
     navigateTo('https://github.com/GabriWar/', {
        external: true,
    });
}
if (link === '2') {
    //js
     navigateTo(
        'https://github.com/GabriWar?tab=repositories&q=&type=source&language=javascript&sort=',
        {
            external: true,
        }
    );
}

if (link === '3') {
    //vue
     navigateTo(
        'https://github.com/GabriWar?tab=repositories&q=&type=source&language=vue&sort=',
        {
            external: true,
        }
    );
}
if (link === '4') {
    //cpp
     navigateTo(
        'https://github.com/GabriWar?tab=repositories&q=&type=source&language=c%2B%2B&sort=',
        {
            external: true,
        }
    );
}
if (link === '5') {
    //rust
     navigateTo(
        'https://github.com/GabriWar?tab=repositories&q=&type=source&language=rust&sort="',
        {
            external: true,
        }
    );
}
if (link === '6') {
    //python
     navigateTo(
        'https://github.com/GabriWar?tab=repositories&q=&type=source&language=python&sort=',
        {
            external: true,
        }
    );
}
if (link === '7') {
    //linux
     navigateTo('https://github.com/GabriWar/LARBS', {
        external: true,
    })}

</script>

<style scoped></style>
