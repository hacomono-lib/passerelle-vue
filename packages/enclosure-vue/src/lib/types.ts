import type { Ref } from 'vue-demi'
import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import type { CommunicateConfig, NavigateMessage, Communicator } from '@passerelle/enclosure'

type MaybeRef<T> = Ref<T> | T

export type IframeRef = MaybeRef<HTMLIFrameElement | null | undefined>

export type ParentToChild = (parentLocation: RouteLocationNormalized) => string

export type ChildToParent = (navigationMessage: NavigateMessage) => RouteLocationRaw

export type UseCommunicator = Partial<Omit<Communicator, 'destroy' | 'navigate'>>

export interface IframeBridgeConfig extends CommunicateConfig {
  /**
   *
   */
  toChildPath: ParentToChild

  /**
   *
   */
  toParentPath: ChildToParent
}
