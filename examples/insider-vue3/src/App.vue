<script setup lang="ts">
import { onMounted } from 'vue-demi'
import { RouterView } from '@intlify/vue-router-bridge'
import Header from './components/Header.vue'
import { useCommunicator } from '@passerelle/insider-vue'
import { Playground } from 'fixtures-insider'

onMounted(() => {
  const communicator = useCommunicator()

  ;(window as any).getCommunicator = () => communicator
})
</script>

<template>
  <section>
    <Header>
      <RouterView />
    </Header>
    <Playground />
  </section>
</template>

<style scoped>
section {
  line-height: 1.5;
  height: 95vh;
}
</style>
