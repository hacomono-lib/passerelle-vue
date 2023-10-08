<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router/composables'
import {
  PasserelleFrame,
  type ParentToChild,
  type ChildToParent,
} from '@passerelle/enclosure-vue'

export default defineComponent({
  components: {
    PasserelleFrame
  },
  setup() {
    const route = useRoute()

    const defaultPath = `http://localhost:5174${extractChildPath(route.path)}`

    function extractChildPath(path: string): string {
      const [, matchedPath] = /^\/bridge(\/.*?)$/.exec(path) ?? []
      if (!matchedPath) {
        throw new Error(`invalid path: ${path}`)
      }
      return matchedPath
    }

    const parentToChild: ParentToChild = (location) => {
      return extractChildPath(location.path)
    }

    const childToParent: ChildToParent = ({ path, params }) => {
      return { path: `/bridge${path}`, params }
    }

    const bridge = ref()

    onMounted(() => {
      // デバッグのためにわざと window を介してルートに communicator を公開している
      ;(window as any).getCommunicator = () => bridge.value.getCommunicator()
    })
    return {
      defaultPath,
      parentToChild,
      childToParent,
      bridge
    }
  }
})
</script>

<template>
  <PasserelleFrame
    class="frame"
    name="passerelle-bridge"
    ref="bridge"
    origin="*"
    communicate-key="passerelle-playground"
    :initial-src="defaultPath"
    :to-child-path="parentToChild"
    :to-parent-path="childToParent"
    required-collab />
</template>

<style scoped>
.frame {
  border: 1px solid var(--color-border);
  width: 100%;
  height: 100%;
}
</style>
