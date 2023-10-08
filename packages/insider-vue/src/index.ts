import type { Plugin, App } from 'vue-demi'
import type { Communicator } from '@passerelle/insider'

import {
  initCommunicator,
  COMMUNICATOR_KEY,
  type InsiderVueConfig,
type InsideCommunicator
} from './communicator'

export { onReceivedData, useCommunicator } from './composables'

export { createCommunicator } from './communicator'

export { type InsiderVueConfig, COMMUNICATOR_KEY }

export const insider: Plugin<InsiderVueConfig | Communicator> = {
  install(app: App, opt: InsiderVueConfig) {
    initCommunicator(app, opt)
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * @link {InsideCommunicator}
     */
    $passerelle: InsideCommunicator
  }
}
