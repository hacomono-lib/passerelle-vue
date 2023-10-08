import { onBeforeUnmount, onMounted, unref, shallowRef, computed, type Ref } from 'vue-demi'
import {
  onBeforeRouteUpdate,
  useRouter,
  type RouteLocationNormalized
} from '@intlify/vue-router-bridge'
import { ensureNotNil } from 'type-assurer'
import {
  createCommunicator as create,
  type Communicator,
  type Json,
  type MessageKey
} from '@passerelle/enclosure'

import type { Iframe, IframeRef, IframeBridgeConfig } from './types'
import { name } from '../package.json'

export const isSSR = typeof window === 'undefined'

const logPrefix = `[${name}]`

const cachedCommunicator = new WeakMap<Iframe, Communicator>()

/**
 * 引数に iframe タグを設定することで、以下の機能を提供する
 * - iframe の src を書き換えてしまうと、ページがリロードされてしまうため、 src を書き換えずにページを遷移する
 * - iframe 内側のページ遷移を検知し、親側の history 及びページパスへ同期させる
 * @param iframeRef
 * @param config
 * @return
 */
export function useIframeBridge(
  iframeRef: IframeRef,
  config: IframeBridgeConfig
): Ref<Communicator | undefined> {
  if (isSSR) {
    return computed(() => undefined)
  }

  const { toParentPath } = config

  const router = useRouter()

  const iframe = unref(iframeRef)

  const cached = iframe ? cachedCommunicator.get(iframe) : undefined

  const communicator = shallowRef<Communicator | undefined>(cached)
  if (communicator.value) {
    return communicator
  }

  onMounted(() => {
    const iframe = ensureNotNil(unref(iframeRef))
    const c = create(iframe, config)
    cachedCommunicator.set(iframe, c)
    communicator.value = c

    c.logPrefix = logPrefix

    c.hooks.on('navigate', (value) => {
      router.replace(toParentPath(value))
    })
  })

  onBeforeRouteUpdate((to, from, next) => {
    if (isSamePathTransition(to, from)) {
      syncHashParentToChild(to, ensureNotNil(unref(communicator)), config)
    }
    return next()
  })

  onBeforeUnmount(() => {
    unref(communicator)?.destroy()
    cachedCommunicator.delete(ensureNotNil(unref(iframeRef)))
  })

  return communicator
}

function isSamePathTransition(to: RouteLocationNormalized, from: RouteLocationNormalized): boolean {
  return to.name === from.name && to.path !== from.path
}

function syncHashParentToChild(
  location: RouteLocationNormalized,
  communicator: Communicator,
  opt: IframeBridgeConfig
) {
  const logScope = 'observer (parent) : sync parent -> child :'
  const path = opt.toChildPath(location)

  if (!path) {
    console.warn(logPrefix, logScope, `path is not found. (inputs: ${path})`)
    return
  }

  console.debug(logPrefix, logScope, `(path: ${path})`)
  communicator.navigate({
    path
  })
}

export function useCommunicator(iframeOrName: string | Iframe | IframeRef): Communicator | undefined {
  if (isSSR) return

  if (typeof iframeOrName === 'string') {
    const iframe = document.querySelector<HTMLIFrameElement>(`iframe[name=${iframeOrName}`)
    if (!iframe) {
      return undefined
    }

    return cachedCommunicator.get(iframe)
  }

  const iframe = unref(iframeOrName)

  if (!iframe) {
    return undefined
  }

  return cachedCommunicator.get(iframe)
}

export function sendData<T extends Json>(
  iframeOrName: string | Iframe | IframeRef,
  key: MessageKey<T>,
  json: T
): void {
  const communicator = useCommunicator(iframeOrName)
  if (!communicator) {
    throw new Error(`communicator is not found.)`)
  }
  communicator.sendData(key, json)
}

export function onReceivedData<T extends Json>(
  iframeOrName: string | Iframe | IframeRef,
  key: MessageKey<T>,
  callback: (value: T) => void
): void {
  const communicator = useCommunicator(iframeOrName)
  if (!communicator) {
    throw new Error(`communicator is not found.)`)
  }

  const callbackWrap = (k: string, v: unknown) => {
    if (k === key) callback(v as T)
  }

  communicator.hooks.on('data', callbackWrap)

  onBeforeUnmount(() => {
    communicator.hooks.off('data', callbackWrap)
  })
}
