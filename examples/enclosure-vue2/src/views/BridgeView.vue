<script lang="ts">
import { defineComponent } from 'vue-demi'
import { useRoute } from '@intlify/vue-router-bridge'

import {
  PasserelleFrame,
  type ConvertEnclosurePathToInsiderPath,
  type ConvertInsiderPathToEnclosurePath,
} from '@passerelle/enclosure-vue'

export default defineComponent({
  components: {
    PasserelleFrame
  },
  setup(_props, ctx) {
    console.dir(ctx)
    const route = useRoute()

    const defaultPath = `http://localhost:5174${extractChildPath(route.path)}`

    function extractChildPath(path: string): string {
      const [, matchedPath] = /^\/bridge(\/.*?)$/.exec(path) ?? []
      if (!matchedPath) {
        throw new Error(`invalid path: ${path}`)
      }
      return matchedPath
    }

    const toInsider: ConvertEnclosurePathToInsiderPath = (location) => {
      return extractChildPath(location.path)
    }

    const toEnclosure: ConvertInsiderPathToEnclosurePath = ({ path, params }) => {
      if (path === '/') {
        return { path: '/' }
      }
      return { path: `/bridge${path}`, params }
    }
    return {
      defaultPath,
      toInsider,
      toEnclosure,
    }
  }
})
</script>

<template>
  <PasserelleFrame
    class="frame"
    name="passerelle-bridge"
    origin="*"
    communicate-key="passerelle-playground"
    :initial-src="defaultPath"
    :to-insider-path="toInsider"
    :to-enclosure-path="toEnclosure"
    required-collab />
</template>

<style scoped>
.frame {
  border: 1px solid var(--color-border);
  width: 100%;
  height: 100%;
}
</style>
