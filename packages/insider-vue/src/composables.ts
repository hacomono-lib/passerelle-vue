import { onUnmounted, getCurrentInstance } from 'vue-demi'
import type { MessageKey, Json } from '@passerelle/insider'

import type { InsideCommunicator } from './communicator'

function isInSetup(): boolean {
  try {
    return !!getCurrentInstance()
  } catch (e) {
    return false
  }
}

export function onReceivedData<T extends Json>(
  key: MessageKey<T>,
  callback: (value: T) => void
): void {
  const communicator = useCommunicator()

  const callbackWrap = (k: string, v: unknown) => {
    if (k === key) callback(v as T)
  }

  communicator.hooks.on('data', callbackWrap)

  if (isInSetup()) {
    onUnmounted(() => {
      communicator.hooks.off('data', callbackWrap)
    })
  }
}

export function sendData<T extends Json>(key: MessageKey<T>, value: T): void {
  const communicator = useCommunicator()
  communicator.sendData(key, value)
}

export function useCommunicator(): InsideCommunicator {
  if (!window.$passerelle) {
    throw new Error('not supported vue version')
  }

  return window.$passerelle
}

export function useFrameLayout(): InsideCommunicator['layout'] {
  return useCommunicator().layout
}
