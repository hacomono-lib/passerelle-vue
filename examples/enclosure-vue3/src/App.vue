<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { Playground } from 'fixture-enclosure'
</script>

<template>
  <section>
    <Header />
    <Playground name="passerelle-bridge" />
  </section>

  <section>
    <RouterView />
  </section>
</template>

<style scoped>
section {
  line-height: 1.5;
  height: 95vh;
}
</style>
