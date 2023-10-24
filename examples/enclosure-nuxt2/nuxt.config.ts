import { resolve } from 'path'
import type { NuxtConfig } from '@nuxt/types'
import type { Configuration as WebpackConfig } from 'webpack'

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  srcDir: './src',

  rootDir: './',

  build: {
    extend(config: WebpackConfig) {
      config.module?.rules.push({
        test: /\.m?jsx?$/i,
        include: [/node_modules/],
        type: 'javascript/auto',
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      })

      config.resolve!.modules = [
        // root の node_modules を参照させない
        resolve(__dirname, 'node_modules')
      ]

      config.resolve!.alias = {
        ...config.resolve!.alias,

        // node_modules 配下が symlink であるため、相対パス指定にしないと webpack が解決できない
        '@passerelle/enclosure-vue': resolve(
          __dirname,
          './node_modules/@passerelle/enclosure-vue/dist/index.es2015.js'
        )
      }
    },

    babel: {
      plugins: [
        // FOR json-editor-vue
        ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
        // FOR @intlify/vue-router-bridge
        ['@babel/plugin-proposal-class-static-block', { loose: true }]
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  components: true,

  buildModules: ['@nuxt/typescript-build'],

  modules: []
} satisfies NuxtConfig
