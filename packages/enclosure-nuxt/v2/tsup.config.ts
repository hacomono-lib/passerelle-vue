import { defineConfig } from 'tsup'
import config from '../package.json'

export default defineConfig([
  {
    name: `${config.name}: entry`,
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    platform: 'node',
    sourcemap: true,
    clean: true,
    minify: false
  },
  {
    name: `${config.name}: nuxt plugin`,
    entry: ['./src/plugin.ts'],
    format: ['esm'],
    platform: 'browser',
    clean: true,
    minify: false,
    treeshake: true,
    bundle: true,
    external: ['vue-demi', '@intlify/vue-router-bridge'],
  }
])
