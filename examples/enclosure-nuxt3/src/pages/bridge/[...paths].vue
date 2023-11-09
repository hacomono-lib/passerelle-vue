<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  PasserelleFrame,
  type ConvertEnclosurePathToInsiderPath,
  type ConvertInsiderPathToEnclosurePath,
} from '@passerelle/enclosure-vue'

const route = useRoute()

definePageMeta({
  key: 'bridge'
})

const defaultPath = `http://localhost:5174${extractChildPath(route.path)}`

function extractChildPath(path: string): string {
  const [, matchedPath] = /^\/bridge(\/.*?)$/.exec(path) ?? []
  if (!matchedPath) {
    throw new Error(`invalid path: ${path}`)
  }
  return matchedPath
}

const parentToChild: ConvertEnclosurePathToInsiderPath = (location) => {
  return extractChildPath(location.path)
}

const childToParent: ConvertInsiderPathToEnclosurePath = ({ path, params }) => {
  if (path === '/') {
    return { path: '/' }
  }
  return { path: `/bridge${path}`, params }
}
</script>

<template>
  <PasserelleFrame
    class="frame"
    name="passerelle-bridge"
    origin="*"
    communicate-key="passerelle-playground"
    :initial-src="defaultPath"
    :to-insider-path="parentToChild"
    :to-enclosure-path="childToParent"
    required-collab />
</template>

<style scoped>
.frame {
  border: 1px solid var(--color-border);
  width: 100%;
  height: 100%;
}
</style>
