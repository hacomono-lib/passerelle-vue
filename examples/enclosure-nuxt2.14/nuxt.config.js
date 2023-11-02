const { resolve } = require('path')

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
module.exports = {
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  srcDir: './src',

  rootDir: './',

  build: {
    /**
     *
     * @param {import('@types/webpack').WebpackConfig} config
     */
    extend(config) {
      config.module.rules.push({
        test: /\.m?jsx?$/i,
        include: [/node_modules/],
        type: 'javascript/auto',
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      })

      config.resolve.modules = [
        // root の node_modules を参照させない
        resolve(__dirname, 'node_modules')
      ]

      config.resolve.alias = {
        ...config.resolve.alias,

        // node_modules 配下が symlink であるため、相対パス指定にしないと webpack が解決できない
        '@passerelle/enclosure-vue': resolve(
          __dirname,
          './node_modules/@passerelle/enclosure-vue/dist/index.es2015.js'
        )
      }
    },

    babel: {
      presets(_env, [_preset, options]) {
        options.loose = true
      }
    }
  },

  css: ['~/assets/css/main.css'],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api'],

  telemetry: false
}
