import { defineComponent, ref, h, type PropType } from 'vue-demi'
import type { RouteLocationNormalized } from '@intlify/vue-router-bridge'
import type { NavigateMessage, HrefMessage, MessageKey, Json } from '@passerelle/enclosure'

import type { ChildToParent, ParentToChild } from './types'
import { useIframeBridge } from './useIframeBridge'

export interface SendData<T extends Json> {
  key: MessageKey<T>
  value: T
}

export default defineComponent({
  props: {
    /**
     * URL to be specified in the iframe's src attribute.
     */
    initialSrc: {
      type: String,
      required: true
    },
    /**
     * Function to craete a new path on the insider side based on the transition information of the enclosuere side.
     */
    toChildPath: {
      type: Function as PropType<ParentToChild>,
      required: true
    },
    /**
     * Function to create a new path on the enclosure side based on the transition information of the insider side.
     */
    toParentPath: {
      type: Function as PropType<ChildToParent>,
      required: true
    },
    /**
     * Specify the origin when sending with iframe's postMessage.
     */
    origin: {
      type: String,
      default: location.origin
    },
    /**
     * Timeout for the collab request
     */
    collabRequestTimeout: {
      type: Number,
      default: 1000
    },
    /**
     * If set to true, passerelle must exist on both the outside and inside of the iframe, enclosure and insider must have the same key.
     */
    requiredCollab: {
      type: Boolean,
      default: false
    },
    /**
     * Specify the key when sending with iframe's postMessage.
     */
    communicateKey: {
      type: String
    }
  },
  emits: {
    navigate: (_value: NavigateMessage) => true,
    href: (_value: HrefMessage) => true,
    data: (_value: SendData<Json>) => true
  },
  expose: ['sendData', 'href', 'navigate'],
  setup(props, { emit, expose }) {
    const frame = ref<HTMLIFrameElement>()

    const communicator = useIframeBridge(frame, {
      toChildPath: (location: RouteLocationNormalized) => props.toChildPath(location),
      toParentPath: (url: NavigateMessage) => props.toParentPath(url),
      origin: props.origin,
      key: props.communicateKey,
      requireCollab: props.requiredCollab,
      collabRequestTimeout: props.collabRequestTimeout,
      onInit() {
        this.hooks.on('navigate', (value: NavigateMessage) => {
          emit('navigate', value)
        })

        this.hooks.on('href', (value: HrefMessage) => {
          emit('href', value)
        })

        this.hooks.on('data', (key: any, value: any) => {
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
      communicator?.sendData(key, value)
    }

    /**
     * Navigate to the specified URL on the insider side.
     * @param href
     */
    function href(href: string) {
      communicator?.href({ href })
    }

    /**
     * If the insider side is SPA, navigate to the specified path on the insider side.
     * @param path
     * @param params
     */
    function navigate(path: string, params: Record<string, string | string[]>) {
      communicator?.navigate({ path, params })
    }

    expose({
      sendData,
      href,
      navigate
    })

    return () => h('iframe', { ref: frame, src: props.initialSrc })
  }
})
