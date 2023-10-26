<script lang="ts">
import { defineComponent } from 'vue-demi'
import { onReceivedData } from '@passerelle/insider-vue'

export default defineComponent({
  setup() {
    onReceivedData('data-sender', (data) => {
      console.log('data received', data)
    })
  }
})
</script>

<template>
  <section>
    <p>see console</p>
  </section>
</template>
