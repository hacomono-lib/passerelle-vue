import { resolve } from 'path'
import { promises } from 'fs'
import { defineConfig, type UserConfig, type PluginOption } from 'vite'

import defu from 'defu'
import baseConfig from './vite.config.ts'
import packages from './package.json'

const { copyFile } = promises

// FIXME: nuxt2 などの webpack 利用版だと、 ?? などの構文が使えないので、ライブラリ側でバンドルしておきたい。
// しかし、通常はバンドルしないのが鉄則であり、
const requiredToBundlePackage = ['@passerelle/enclosure', 'type-assurer']

const merged = defineConfig(
  defu(
    {
      plugins: [
        {
          name: 'copy-dts',
          async buildEnd() {
            await copyFile(
              resolve(__dirname, 'dist', 'types.d.ts'),
              resolve(__dirname, 'dist', 'index.es2015.d.ts')
            )
          }
        } satisfies PluginOption
      ],
      build: {
        target: 'es2015',
        emptyOutDir: false,
        lib: {
          fileName: 'index.es2015'
        },
      },
    },
    baseConfig
  ) as UserConfig
)

merged.build!.rollupOptions!.external = Array.from(
  new Set([...Object.keys(packages.dependencies), ...Object.keys(packages.peerDependencies)])
).filter((f) => !requiredToBundlePackage.includes(f))

export default merged
