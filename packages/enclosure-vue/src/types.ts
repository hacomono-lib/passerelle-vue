import type { Ref } from 'vue-demi'
import type { RouteLocationNormalized, RouteLocationRaw } from '@intlify/vue-router-bridge'
import type { CommunicateConfig, NavigateMessage, Communicator } from '@passerelle/enclosure'

type MaybeRef<T> = Ref<T> | T

export type Iframe = HTMLIFrameElement

export type IframeRef = MaybeRef<Iframe | null | undefined>

export type ConvertEnclosurePathToInsiderPath = (parentLocation: RouteLocationNormalized) => string

export type ConvertInsiderPathToEnclosurePath = (navigationMessage: NavigateMessage) => RouteLocationRaw

export type UseCommunicator = Partial<Omit<Communicator, 'destroy' | 'navigate'>>

export interface PasserelleFrameConfig extends CommunicateConfig {
  /**
   *
   */
  toInsiderPath: ConvertEnclosurePathToInsiderPath

  /**
   *
   */
  toEnclosurePath: ConvertInsiderPathToEnclosurePath
}

// https://github.com/microsoft/TypeScript/issues/32164 より拝借

type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>;

type OverloadUnionRecursive<TOverload, TPartialOverload = unknown> = TOverload extends (
  ...args: infer TArgs
) => infer TReturn
  ?
    TPartialOverload extends TOverload
    ? never
    :
        | OverloadUnionRecursive<
            TPartialOverload & TOverload,
            TPartialOverload & ((...args: TArgs) => TReturn) & OverloadProps<TOverload>
          >
        | ((...args: TArgs) => TReturn)
  : never;

type OverloadUnion<TOverload extends (...args: any[]) => any> = Exclude<
  OverloadUnionRecursive<
    (() => never) & TOverload
  >,
  TOverload extends () => never ? never : () => never
>;

export type OverloadParameters<T extends (...args: any[]) => any> = Parameters<OverloadUnion<T>>;
