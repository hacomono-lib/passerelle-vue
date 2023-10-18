/// </// <reference path="./modules.d.ts" />
import type { App } from 'vue-demi'
import { initCommunicator, type InsiderVueConfig, type InsideCommunicator } from './communicator'

export type {
  HrefMessage,
  Json,
  MessageKey,
  NavigateMessage,
  SendDataMessage
} from '@passerelle/core'

export { onReceivedData, useCommunicator, sendData, useFrameLayout } from './composables'

export { createCommunicator, type InsiderVueConfig } from './communicator'

type FixedPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(app: any, opt: InsiderVueConfig): void
}

export const insider: FixedPlugin = {
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

// for vue2
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare module 'vue/types/vue' {
  interface Vue {
    readonly $passerelle: InsideCommunicator
  }
}
