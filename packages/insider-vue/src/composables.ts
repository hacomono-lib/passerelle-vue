import { inject, onUnmounted, getCurrentInstance } from 'vue'
import type { MessageKey, Json } from '@passerelle/insider'

import { COMMUNICATOR_KEY, type InsideCommunicator } from './communicator'
import { isSSR } from './common'

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
  if (isSSR) throw Error('passerelle communicator can not be used in SSR')

  const communicator = inject(COMMUNICATOR_KEY)
  if (!communicator) throw new Error('passerelle insider is not installed')

  return communicator
}
