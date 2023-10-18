/* eslint-disable max-lines-per-function */
import { shallowRef, unref, isVue3, isVue2, toRaw } from 'vue-demi'
import type { Ref, App } from 'vue-demi'
import type Vue from 'vue-demi'

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

  readonly layout: Readonly<LayoutMetrix>

  navigate(path: string, params?: Record<string, string>): void

  /**
   *
   * @param href
   */
  href(href: string): void

  /**
   *
   * @param key
   * @param value
   */
  sendData(key: string, value: unknown | Ref<unknown>): void

  /**
   *
   * @param key
   * @param value
   */
  sendData<T extends Json>(key: MessageKey<T>, value: T | Ref<T>): void
}

declare global {
  interface Window {
    readonly $passerelle: InsideCommunicator
  }
}

export function initCommunicator(app: App | typeof Vue, config: InsiderVueConfig): void {
  const insideCommunicator = isSSR ? createServerCommunicator() : createClientCommunicator(config)

  createClientCommunicator(config)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).$passerelle = insideCommunicator

  if (isVue3) {
    Object.defineProperty((app as App).config.globalProperties, '$passerelle', {
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

const defaultHeight = isSSR ? 0 : window.parent?.innerHeight ?? window.innerHeight
const defaultWidth = isSSR ? 0 : window.parent?.innerWidth ?? window.innerWidth

const defaultLayout = {
  enclosure: {
    window: {
      width: defaultWidth,
      height: defaultHeight
    },
  },
  insider: {
    window: {
      width: defaultWidth,
      height: defaultHeight
    },
    offset: {
      top: 0,
      left: 0
    },
  },
} satisfies LayoutMetrix

Object.freeze(defaultLayout)

function createClientCommunicator(config: InsiderVueConfig): InsideCommunicator {
  const communicator = config.communicator ?? createCommunicator(config)

  const originSendData = communicator.sendData
  communicator.sendData = function (key, value) {
    originSendData.call(communicator, key, toRaw(value))
  }

  const layout = shallowRef<LayoutMetrix>(defaultLayout)

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
      return unref(layout)
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
      return defaultLayout
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
