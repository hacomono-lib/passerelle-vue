<script setup lang="ts">
import { Playground } from 'fixtures-enclosure'
</script>

<template>
  <section>
    <Header />
    <Playground name="passerelle-bridge" />
  </section>

  <section>
    <slot />
  </section>
</template>

<style scoped>
section {
  line-height: 1.5;
  height: 95vh;
}
</style>
