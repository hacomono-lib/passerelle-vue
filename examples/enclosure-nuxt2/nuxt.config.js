export default {
  head: {
    title: 'example-enclosure-nuxt2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  srcDir: './src',

  css: [
    '~/assets/css/main.css'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
  ],

  build: {
  }
}
