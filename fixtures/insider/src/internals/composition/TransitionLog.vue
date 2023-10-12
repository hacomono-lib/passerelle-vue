<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue-demi'
import { useCommunicator, type NavigateMessage } from '@passerelle/insider-vue'

interface Log {
  timestamp: string
  path: string
  params: Record<string, string | string[]>
}

export default defineComponent({
  setup() {
    const communicator = useCommunicator()

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

    communicator.hooks.on('navigate', onNavigated)

    onUnmounted(() => {
      communicator.hooks.off('navigate', onNavigated)
    })

    return {
      logs
    }
  }
})
</script>

<template>
  <section>
    <h2>Logs for insider</h2>
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
  </section>
</template>
