import { onBeforeUnmount, onMounted, unref, shallowRef, computed, type Ref } from 'vue-demi'
import { onBeforeRouteUpdate, useRouter, type RouteLocationNormalized } from '@intlify/vue-router-bridge'
import { ensureNotNil } from 'type-assurer'
import { createCommunicator as create, type Communicator } from '@passerelle/enclosure'

import type { IframeRef, IframeBridgeConfig } from '../lib/types'
import { name } from '../../package.json'

const isSSR = typeof window === 'undefined'

const logPrefix = `[${name}]`

/**
 * 引数に iframe タグを設定することで、以下の機能を提供する
 * - iframe の src を書き換えてしまうと、ページがリロードされてしまうため、 src を書き換えずにページを遷移する
 * - iframe 内側のページ遷移を検知し、親側の history 及びページパスへ同期させる
 * @param iframeRef
 * @param config
 * @return
 */
export function useIframeBridge(iframeRef: IframeRef, config: IframeBridgeConfig): Ref<Communicator | undefined> {
  if (isSSR) {
    return computed(() => undefined)
  }

  const { toParentPath } = config

  const router = useRouter()

  const communicator = shallowRef<Communicator>()

  onMounted(() => {
    const c = create(ensureNotNil(unref(iframeRef)), config)
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
