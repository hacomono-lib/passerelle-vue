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

<script lang="ts">
import { defineComponent } from 'vue-demi'
import type { NavigateMessage } from '@passerelle/insider-vue'

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
          params: params ?? {}
        }
      ]
    }
  },

  mounted() {
    // FIXME: #9 cannot access  type safety
    (this as any).$passerelle.hooks.on('navigate', this.onNavigated)
  },

  unmounted() {
    // FIXME: #9 cannot access  type safety
    (this. as any)$passerelle.hooks.off('navigate', this.onNavigated)
  }
})
</script>
