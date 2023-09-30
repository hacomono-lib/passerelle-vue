export default defineNuxtConfig({
  modules: ['@passerelle/insider-nuxt'],
  srcDir: './src',
  css: ['~/assets/css/main.css'],

  passerelle: {
    key: 'passerelle-playground'
  },
})
