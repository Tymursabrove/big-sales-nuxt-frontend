// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt-icon"],
  runtimeConfig: {
    public: {
      apiBase: '',
    }
  },

  googleFonts: {
    families: {
      Roboto: true,
      Lato: [600, 800],
    }
  }
})
