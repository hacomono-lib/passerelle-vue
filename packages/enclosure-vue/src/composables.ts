import { onBeforeUnmount, onMounted, unref, shallowRef, computed, toRaw, type Ref, getCurrentInstance } from 'vue-demi'
import {
  useRouter,
  type RouteLocationNormalized,
  type RouteLocationRaw
} from '@intlify/vue-router-bridge'
import { ensureNotNil } from 'type-assurer'
import {
  createCommunicator as create,
  type Communicator,
  type Json,
  type MessageKey
} from '@passerelle/enclosure'

import { onBeforeRouteUpdate } from './fallback'

import type { Iframe, PasserelleFrameConfig } from './types'
import { name } from '../package.json'

export const isSSR = typeof window === 'undefined'

const logPrefix = `[${name}]`

const cachedCommunicator = new WeakMap<Iframe, Communicator>()

function createCommunicator(
  iframe: HTMLIFrameElement,
  config: PasserelleFrameConfig
): Communicator {
  const communicator = create(iframe, config)
  communicator.logPrefix = logPrefix

  const originalSendData = communicator.sendData
  communicator.sendData = function (key, value) {
    // vue の reactive なオブジェクトを送信するとエラーになるため、 toRaw でプレーンなオブジェクトに変換する
    originalSendData.call(communicator, key, toRaw(value))
  }

  return communicator
}


export function getIframeDom(): HTMLIFrameElement {
  const current = getCurrentInstance()
  if (!current) throw new Error('current instance is not found.')

  if (!current.isMounted) throw new Error('current instance is not mounted.')

  // vue2 は elm, vue3 は el
  const iframe = current.proxy?.$el
  if (!iframe) throw new Error('iframe element is not found.')

  return iframe
}

/**
 * 引数に iframe タグを設定することで、以下の機能を提供する
 * - iframe の src を書き換えてしまうと、ページがリロードされてしまうため、 src を書き換えずにページを遷移する
 * - iframe 内側のページ遷移を検知し、親側の history 及びページパスへ同期させる
 * @param iframeRef
 * @param config
 * @return
 */
export function usePasserelle(
  config: PasserelleFrameConfig
): Ref<Communicator | undefined> {
  if (isSSR) {
    return computed(() => undefined)
  }

  const { toEnclosurePath } = config

  const router = useRouter()

  const communicator = shallowRef<Communicator | undefined>()

  onMounted(() => {
    const iframe = getIframeDom()
    const c = createCommunicator(iframe, config)
    cachedCommunicator.set(iframe, c)

    communicator.value = c

    c.hooks.on('navigate', (value) => {
      const parentPath = toEnclosurePath(value)

      if (isSamePathNavigated(parentPath, unref(router.currentRoute))) return

      router.replace(parentPath)
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
  })

  return communicator
}

function isSamePathNavigated(to: RouteLocationRaw, from: RouteLocationRaw): boolean {
  type Fixed = { path: string; query?: Record<string, string | string[]> }
  const fixedTo = (typeof to === 'string' ? { path: to } : to) as Fixed
  const fixedFrom = (typeof from === 'string' ? { path: from } : from) as Fixed

  return (
    fixedTo.path === fixedFrom.path &&
    JSON.stringify(fixedTo.query ?? {}) === JSON.stringify(fixedFrom.query ?? {})
  )
}

function isSamePathTransition(to: RouteLocationNormalized, from: RouteLocationNormalized): boolean {
  return to.name === from.name && to.path !== from.path
}

function syncHashParentToChild(
  location: RouteLocationNormalized,
  communicator: Communicator,
  opt: PasserelleFrameConfig
) {
  const logScope = 'observer (parent) : sync parent -> child :'
  const path = opt.toInsiderPath(location)

  if (!path) {
    console.warn(logPrefix, logScope, `path is not found. (inputs: ${path})`)
    return
  }

  console.debug(logPrefix, logScope, `(path: ${path})`)
  communicator.navigate({
    path
  })
}

type OrRef<T> = T | Ref<T>

export function useCommunicator(
  iframeOrName: OrRef<string> | OrRef<Iframe>
): Communicator | undefined {
  if (isSSR) return

  const iframe = (() => {
    const raw = unref(iframeOrName)
    return typeof raw === 'string'
      ? document.querySelector<HTMLIFrameElement>(`iframe[name=${raw}`)
      : raw
  })()

  return iframe ? cachedCommunicator.get(iframe) : undefined
}

export function sendData<T extends Json>(
  iframeOrName: OrRef<string> | OrRef<Iframe>,
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
  iframeOrName: OrRef<string> | OrRef<Iframe>,
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
