<template>
  <section>
    <p>see console</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  methods: {
    onReceivedData(key: string, data: unknown) {
      if (key === 'data-sender') {
        console.log('data received', data);
      }
    }
  },
  mounted() {
    // FIXME: #9 cannot access  type safety
    (this as any).$passerelle.hooks.on('data', this.onReceivedData)
  },
  unmounted() {
    // FIXME: #9 cannot access  type safety
    (this as any).$passerelle.hooks.off('data', this.onReceivedData)
  }
})
</script>
