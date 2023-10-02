import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  mode: 'development',
  base: '/',
  plugins: [
    createVuePlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
