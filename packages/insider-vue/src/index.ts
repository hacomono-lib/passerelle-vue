import type { Plugin, App } from 'vue'
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

export const insider = {
  install(app: App, opt: InsiderVueConfig) {
    initCommunicator(app, opt)
  }
} satisfies Plugin<InsiderVueConfig | Communicator>

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * @link {InsideCommunicator}
     */
    $passerelle: InsideCommunicator
  }
}
