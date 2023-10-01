/// <reference types="@passerelle/enclosure-vue" />
import type { Module } from '@nuxt2/types'
import { resolve } from 'path'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModuleOptions { }

const module: Module<ModuleOptions> = function (_moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, './plugin.mjs'),
    fileName: 'enclosure/plugin.js'
  })
}

export default module
