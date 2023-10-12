<template>
  <section>
    <p>see console</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Json } from '@passerelle/insider-vue'

export default defineComponent({
  methods: {
    onReceivedData(key: string, data: Json) {
      if (key === 'data-sender') {
        console.log('data received', data);
      }
    }
  },
  mounted() {
    this.$passerelle.hooks.on('data', this.onReceivedData)
  },
  unmounted() {
    this.$passerelle.hooks.off('data', this.onReceivedData)
  }
})
</script>
