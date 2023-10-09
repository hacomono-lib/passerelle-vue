import type { Plugin, App } from 'vue-demi'
import type { Communicator } from '@passerelle/insider'

import {
  initCommunicator,
  type InsiderVueConfig,
  type InsideCommunicator
} from './communicator'

export type {
  HrefMessage,
  Json,
  MessageKey,
  NavigateMessage,
  SendDataMessage
} from '@passerelle/core'

export { onReceivedData, useCommunicator, sendData } from './composables'

export { createCommunicator, type InsiderVueConfig } from './communicator'

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
