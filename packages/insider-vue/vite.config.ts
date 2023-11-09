import { resolve } from 'path'
import { promises } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import packages from './package.json'

const { readFile, writeFile } = promises

const typesDist = resolve(__dirname, packages.types)
const devMode = process.env['NODE_ENV'] === 'development'

const typesSuffix = `
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    readonly $passerelle: Communicator
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $passerelle: Communicator
  }
}
`

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      async afterBuild() {
        const typeContent = await readFile(typesDist, 'utf-8')
        await writeFile(typesDist, typeContent + typesSuffix, 'utf-8')
      },
    })
  ],
  build: {
    emptyOutDir: true,
    minify: false,
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'PasserelleInsiderVue',
      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue-demi', '@intlify/vue-router-bridge', ...Object.keys(packages.peerDependencies)]
    }
  },
  esbuild: {
    pure: devMode ? [] : ['console.log', 'console.info', 'console.debug']
  },
  optimizeDeps: {
    exclude: ['vue-demi', '@intlify/vue-router-bridge']
  }
})
