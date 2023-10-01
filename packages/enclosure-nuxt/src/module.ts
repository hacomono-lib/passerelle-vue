import { defineNuxtModule, addComponent } from '@nuxt/kit'
import { name } from '../package.json'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name
  },
  defaults: {},
  setup(_options, _nuxt) {
    addComponent({
      filePath: '@passerelle/enclosure-vue/src/components/BridgeFrame',
      name: 'BridgeFrame',
      island: false
    })
  }
})
