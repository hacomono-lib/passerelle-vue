import { onUnmounted, getCurrentInstance, isVue3, isVue2, toRaw } from 'vue-demi'
import type { MessageKey, Json } from '@passerelle/insider'

import type { InsideCommunicator } from './communicator'

export function onReceivedData<T extends Json>(
  key: MessageKey<T>,
  callback: (value: T) => void
): void {
  const communicator = useCommunicator()

  const callbackWrap = (k: string, v: unknown) => {
    if (k === key) callback(v as T)
  }

  communicator.hooks.on('data', callbackWrap)

  onUnmounted(() => {
    communicator.hooks.off('data', callbackWrap)
  })
}

export function sendData<T extends Json>(key: MessageKey<T>, value: T): void {
  const communicator = useCommunicator()
  communicator.sendData(key, toRaw(value))
}

export function useCommunicator(): InsideCommunicator {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('onUpdateLayout can only be used in setup function')
  }

  if (isVue3) {
    return instance.appContext.config.globalProperties.$passerelle
  }

  if (isVue2) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (instance as any).$passerelle
  }

  throw new Error('not supported vue version')
}
