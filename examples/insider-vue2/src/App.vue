<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from './components/Header.vue'
import { Playground } from 'fixtures-insider'
import type { Component } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Header: Header as Component,
    Playground: Playground as Component
  }
})
</script>

<template>
  <section>
    <Header>
      <router-view />
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
