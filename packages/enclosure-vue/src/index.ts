import type { Plugin } from 'vue-demi'
import BridgeFrame from './components/BridgeFrame'
export type { ParentToChild, ChildToParent, IframeBridgeConfig } from './lib/types'

export { BridgeFrame }

export const enclosure = {
  install(app) {
    app.component('BridgeFrame', BridgeFrame)
  }
} satisfies Plugin
