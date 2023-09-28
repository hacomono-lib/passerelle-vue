import { inject, onUnmounted, getCurrentInstance } from 'vue-demi'
import type { MessageKey, Json } from '@passerelle/insider'

import { COMMUNICATOR_KEY, type InsideCommunicator } from './communicator'

export function onReceivedData<T extends Json>(
  key: MessageKey<T>,
  callback: (value: T) => void
): void {
  if (!getCurrentInstance()) {
    console.warn('onUpdateLayout can only be used in setup function')
    return
  }

  const communicator = useCommunicator()

  const callbackWrap = (k: string, v: unknown) => {
    if (k === key) callback(v as T)
  }

  communicator.hooks.on('data', callbackWrap)

  onUnmounted(() => {
    communicator.hooks.off('data', callbackWrap)
  })
}

export function useCommunicator(): InsideCommunicator {
  return inject(COMMUNICATOR_KEY)!
}
