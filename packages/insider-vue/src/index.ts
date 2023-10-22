import type { App } from 'vue-demi'
import { initCommunicator, createCommunicator, type InsiderVueConfig, type InsideCommunicator as Communicator } from './communicator'
import { onReceivedData, useCommunicator, sendData, useFrameLayout } from './composables'

export type {
  HrefMessage,
  Json,
  MessageKey,
  NavigateMessage,
  SendDataMessage
} from '@passerelle/core'

type FixedPlugin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(app: any, opt: InsiderVueConfig): void
}

export const insider: FixedPlugin = {
  install(app: App, opt: InsiderVueConfig) {
    initCommunicator(app, opt)
  }
}

export { initCommunicator, createCommunicator, type Communicator, onReceivedData, useCommunicator, sendData, useFrameLayout }
