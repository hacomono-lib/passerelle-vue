import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import packages from './package.json'

const devMode = process.env['NODE_ENV'] === 'development'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      bundledPackages: ['vue-demi', '@intlify/vue-router-bridge']
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
      external: [...Object.keys(packages.dependencies), ...Object.keys(packages.peerDependencies)]
    }
  },
  esbuild: {
    pure: devMode ? [] : ['console.log', 'console.info', 'console.debug']
  },
  optimizeDeps: {
    exclude: ['vue-demi', '@intlify/vue-router-bridge']
  }
})
