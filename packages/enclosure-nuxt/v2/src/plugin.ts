import { enclosure } from '@passerelle/enclosure-vue'
import type { Plugin, Context } from '@nuxt2/types'

const plugin: Plugin = function(context: Context) {
  context.app['use'](enclosure)
}
export default plugin
