import { shallowRef, unref, readonly, computed, isVue3, isVue2 } from 'vue-demi'
import type { Ref, App } from 'vue-demi'
import type { Router, RouteParams } from '@intlify/vue-router-bridge'
import { createCommunicator as create } from '@passerelle/insider'
import type { Communicator, LayoutMetrix, CommunicateConfig, Json, MessageKey } from '@passerelle/insider'

import { isSSR } from './common'
import { name } from '../package.json'

const logPrefix = `[${name}]`

export interface InsiderVueConfig extends CommunicateConfig {
  router: Router
  communicator?: Communicator
}

export interface InsideCommunicator {
  readonly communicator: Communicator

  readonly hooks: Communicator['hooks']

  readonly layout: Ref<LayoutMetrix | undefined>

  navigate(path: string, params?: Record<string, string>): void

  href(href: string): void

  sendData<T extends Json>(key: MessageKey<T>, value: T | Ref<T>): void
}

export function initCommunicator(app: App, config: InsiderVueConfig): void {
  const insideCommunicator = isSSR ? createServerCommunicator() : createClientCommunicator(config)

  createClientCommunicator(config)

  if (isVue3) {
    Object.defineProperty(app.config.globalProperties, '$passerelle', {
      enumerable: true,
      get: () => {
        return insideCommunicator
      },
    })
  }

  if (isVue2) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (app as any).prototype.$passerelle = insideCommunicator
  }
}

function isSamePath(from: { path: string, params: RouteParams }, to: { path: string, params: RouteParams }): boolean {
  return from.path === to.path && JSON.stringify(from.params) === JSON.stringify(to.params)
}

function createClientCommunicator(config: InsiderVueConfig): InsideCommunicator {
  const communicator = config.communicator ?? createCommunicator(config)

  const layout = shallowRef<LayoutMetrix | undefined>()

  communicator.hooks.on('href', (value) => {
    window.location.href = value.href
  })

  communicator.hooks.on('layout', (value) => {
    layout.value = value
  })

  communicator.hooks.on('navigate', (value) => {
    const { path, params = {} } = value

    if (!isSamePath(unref(config.router.currentRoute), { path, params })) {
      config.router.replace({ path, params })
    }
  })

  config.router.beforeEach((to, _from, next) => {
    communicator.navigate({ path: to.path, params: to.params })
    return next()
  })

  const originBeforeUnload = window.onbeforeunload
  window.onbeforeunload = function (event) {
    communicator.destroy()
    originBeforeUnload?.call(window, event)
  }

  const insideCommunicator = {
    get communicator() {
      return communicator
    },

    get hooks() {
      return communicator.hooks
    },

    get layout() {
      return readonly(layout)
    },

    navigate(path: string, params?: Record<string, string>) {
      communicator.navigate({ path, params })
    },

    href(href: string) {
      communicator.href({ href })
    },

    sendData<T extends Json>(key: MessageKey<T>, value: T | Ref<T>) {
      communicator.sendData(key, unref(value))
    }
  } satisfies InsideCommunicator
  return insideCommunicator
}

function createServerCommunicator(): InsideCommunicator {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = (): undefined => {}
  const errorMessage = 'communicator is not available in SSR'

  return {
    get communicator(): Communicator {
      throw new Error(errorMessage)
    },

    get hooks(): Communicator['hooks'] {
      throw new Error(errorMessage)
    },

    get layout() {
      return computed(noop)
    },

    navigate: noop,
    href: noop,
    sendData: noop
  } satisfies InsideCommunicator
}

export function createCommunicator(config: Omit<InsiderVueConfig, 'router'>): Communicator {
  const communicator = create(config)
  communicator.logPrefix = logPrefix
  return communicator
}
