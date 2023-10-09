<template>
  <section>
    <template v-if="exists">
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
    </template>
    <template v-else>communicator not found</template>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import {
  useCommunicator,
  type NavigateMessage
} from '@passerelle/insider-vue'

interface Log {
  timestamp: string
  path: string
  params: Record<string, string | string[]>
}

export default defineComponent({
  data() {
    return {
      logs: [] as Log[],
      initialized: false
    }
  },

  computed: {
    communicator() {
      return useCommunicator()
    },

    exists() {
      return !!this.communicator
    },

    path() {
      return location.pathname
    }
  },

  methods: {
    onNavigated({ path, params }: NavigateMessage) {
      this.logs = [
        ...this.logs,
        {
          timestamp: new Date().toISOString(),
          path,
          params
        }
      ]
    },

    initHook() {
      if (this.initialized) return

      this.initialized = true
      this.communicator?.hooks.on('navigate', this.onNavigated)
    }
  },

  watch: {
    path() {
      if (!!this.communicator) {
        this.initHook()
      }
    }
  },

  mounted() {
    if (!!this.communicator) {
      this.initHook()
    }
  },

  unmounted() {
    this.communicator?.hooks.off('navigate', this.onNavigated)
  }
})
</script>
