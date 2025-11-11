<template>
  <div class="wrapperNuxt">
    <NuxtPage />
    <Navbar />
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      children: `
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
  _paq.push(["setCookieDomain", "*.www.gabriwar.xyz"]);
  _paq.push(["setDomains", ["*.www.gabriwar.xyz"]]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//matomo.gabriwar.xyz/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
      `,
      type: 'text/javascript'
    }
  ],
  noscript: [
    {
      children: '<p><img referrerpolicy="no-referrer-when-downgrade" src="//matomo.gabriwar.xyz/matomo.php?idsite=1&rec=1" style="border:0;" alt="" /></p>'
    }
  ]
})
</script>

<style>

body, html {
  overflow: hidden;
  background-color: #000000;
}
</style>
