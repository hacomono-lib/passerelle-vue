<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { EnclosurePlayground } from 'fixture-vue-component'
</script>

<template>
  <section>
    <Header />
    <EnclosurePlayground />
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
