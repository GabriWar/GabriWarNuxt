// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-03-23",
  // Supabase temporarily disabled to avoid missing project URL/Key errors.
  // To re-enable, add "@nuxtjs/supabase" back to the modules array and
  // restore the `supabase` configuration below.
  modules: [],
  // supabase: {
  //   redirect: false,
  //   redirectOptions: {
  //     login: '/login',
  //     callback: '/confirm',
  //     exclude: ['/'],
  //   }
  // }
});