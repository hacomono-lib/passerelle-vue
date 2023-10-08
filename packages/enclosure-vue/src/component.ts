/* eslint-disable max-lines-per-function */
import { defineComponent, ref, h, type IframeHTMLAttributes, type HTMLAttributes, type PropType } from 'vue-demi'
import type { RouteLocationNormalized } from '@intlify/vue-router-bridge'
import type {
  NavigateMessage,
  HrefMessage,
  MessageKey,
  Json,
  Communicator
} from '@passerelle/enclosure'

import type { ChildToParent, ParentToChild, OverloadParameters } from './types'
import { useIframeBridge, isSSR } from './composables'

export interface SendData<T extends Json> {
  key: MessageKey<T>
  value: T
}

export interface Props {
  /**
   * Name of the PasserelleFrame component. and the iframe's name attribute.
   * Required for use with composable
   */
  name: string

  /**
   * URL to be specified in the iframe's src attribute.
   */
  initialSrc: string

  /**
   * Function to craete a new path on the insider side based on the transition information of the enclosuere side.
   */
  toChildPath: ParentToChild

  /**
   * Function to craete a new path on the enclosure side based on the transition information of the insider side.
   */
  toParentPath: ChildToParent

  /**
   * The origin of the insider side.
   * @default location.origin
   */
  origin?: string

  /**
   * Timeout for requesting collaboration.
   * @default 1000
   */
  collabRequestTimeout?: number

  /**
   * Whether to require collaboration.
   * @default false
   */
  requiredCollab?: boolean

  /**
   * The key used to communicate with the insider side.
   */
  communicateKey?: string
}

type ExactProps = Props & Omit<IframeHTMLAttributes, keyof HTMLAttributes>

const defaultProps = {
  origin: () => (isSSR ? '' : location.origin),
  collabRequestTimeout: 1000,
  requiredCollab: false
} satisfies Partial<{
  [K in keyof ExactProps]: ExactProps[K] | (() => ExactProps[K])
}>

type PropOption = {
  [K in keyof (ExactProps & Required<ExactProps>)]: {
    type: PropType<ExactProps[K]>
    required: ExactProps[K] extends undefined ? false : true,
    default: (typeof defaultProps & Record<string , undefined>)[K] extends undefined ? undefined : ExactProps[K]
  }
}

export interface Emits {
  (e: 'navigate', value: NavigateMessage): void
  (e: 'href', value: HrefMessage): void
  (e: 'data', value: SendData<Json>): void
}

type EmitOption = {
  [K in OverloadParameters<Emits>[0]]: (_value: OverloadParameters<Emits>[1]) => true
}

export default defineComponent({
  name: 'PasserelleFrame',

  props: {
    origin: {
      default: defaultProps.origin
    },
    collabRequestTimeout: {
      default: defaultProps.collabRequestTimeout
    },
    requiredCollab: {
      default: defaultProps.requiredCollab
    }
  } as unknown as PropOption,

  emits: ['navigate', 'href', 'data'] as unknown as EmitOption,

  expose: ['sendData', 'href', 'navigate'],

  setup(props, { emit, expose, attrs }) {
    const frame = ref<HTMLIFrameElement>()

    const communicator = useIframeBridge(frame, {
      toChildPath: (location: RouteLocationNormalized) => props.toChildPath?.(location) ?? location.path,
      toParentPath: (url: NavigateMessage) => props.toParentPath?.(url) ?? url.path,
      origin: props.origin,
      key: props.communicateKey,
      requireCollab: props.requiredCollab,
      collabRequestTimeout: props.collabRequestTimeout,
      onInit(this: Communicator) {
        this.hooks.on('navigate', (value) => {
          emit('navigate', value)
        })

        this.hooks.on('href', (value) => {
          emit('href', value)
        })

        this.hooks.on('data', (key, value) => {
          emit('data', { key, value })
        })
      }
    })

    /**
     * Send data to the insider side.
     * @param key
     * @param value
     */
    function sendData<T extends Json>(key: MessageKey<T>, value: T) {
      communicator.value?.sendData(key, value)
    }

    /**
     * Navigate to the specified URL on the insider side.
     * @param href
     */
    function href(href: string) {
      communicator.value?.href({ href })
    }

    /**
     * If the insider side is SPA, navigate to the specified path on the insider side.
     * @param path
     * @param params
     */
    function navigate(path: string, params: Record<string, string | string[]>) {
      communicator.value?.navigate({ path, params })
    }

    const {
      'initial-src': _1,
      'to-child-path': _2,
      'to-parent-path': _3,
      origin: _4,
      'collab-request-timeout': _5,
      'required-collab': _6,
      'communicate-key': _7,
      ...iframeAttrs
    } = attrs

    expose({
      sendData,
      href,
      navigate
    })

    return () => h('iframe', { ref: frame, src: props.initialSrc, ...iframeAttrs })
  }
})
