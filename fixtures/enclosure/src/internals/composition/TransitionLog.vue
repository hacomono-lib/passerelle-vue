<script lang="ts">
import { defineComponent, ref, computed, onUnmounted, watch } from 'vue-demi'
import {
  useCommunicator,
  type NavigateMessage
} from '@passerelle/enclosure-vue'

interface Log {
  timestamp: string
  path: string
  params: Record<string, string | string[]>
}

const isSSR = typeof window === 'undefined'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup({ name }) {
    const initialized = ref(false)

    const communicator = computed(() => {
      if (!isSSR && location.pathname.startsWith('/bridge')) {
        return useCommunicator(name)
      }

      return undefined
    })

    if (!!communicator.value) {
      initHook()
    }

    watch(
      () => location.pathname,
      () => {
        if (!!communicator.value) {
          initHook()
        }
      }
    )

    const exists = computed(() => !!communicator.value)

    const logs = ref<Log[]>([])

    function onNavigated({ path, params }: NavigateMessage) {
      logs.value = [
        ...logs.value,
        {
          timestamp: new Date().toISOString(),
          path,
          params: params ?? {}
        }
      ]
    }

    function initHook() {
      if (initialized.value) return

      initialized.value = true
      communicator.value?.hooks.on('navigate', onNavigated)
    }

    onUnmounted(() => {
      communicator.value?.hooks.off('navigate', onNavigated)
    })

    return {
      exists,
      logs
    }
  }
})
</script>

<template>
  <section>
    <template v-if="exists">
      <h2>Logs for {{ name }}</h2>
      <ul>
        <li
          v-for="log in logs"
          :key="log.timestamp">
          <strong>{{ log.timestamp }}</strong>
          - {{ log.path }}
          <ul>
            <li
              v-for="(value, key) in log.params"
              :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </li>
      </ul>
    </template>
    <template v-else>communicator not found</template>
  </section>
</template>
