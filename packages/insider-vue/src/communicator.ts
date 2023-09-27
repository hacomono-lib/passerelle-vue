import { shallowRef, unref, readonly } from 'vue'
import type { Ref, InjectionKey, App } from 'vue'
import type { Router } from 'vue-router'
import { createCommunicator as create } from '@passerelle/insider'
import type { Communicator, LayoutMetrix, CommunicateConfig, Json, MessageKey } from '@passerelle/insider'

import { isSSR } from './common'
import { name } from '../package.json'

export const COMMUNICATOR_KEY = Symbol() as InjectionKey<InsideCommunicator>

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
  if (isSSR) return

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
    config.router.replace({ path, params })
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

  app.provide(COMMUNICATOR_KEY, insideCommunicator)

  // FIXME: あってる？これ
  app['$passerelle'] = insideCommunicator
}

export function createCommunicator(config: Omit<InsiderVueConfig, 'router'>): Communicator {
  const communicator = create(config)
  communicator.logPrefix = logPrefix
  return communicator
}
