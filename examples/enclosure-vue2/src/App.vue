<script lang="ts">
import { type Component } from 'vue'
import { defineComponent } from '@vue/composition-api'
import Header from './components/Header.vue'
import { Playground } from 'fixtures-enclosure'

export default defineComponent({
  name: 'App',
  components: {
    Header: Header as Component,
    Playground: Playground as Component
  }
})
</script>

<template>
  <div>
    <section>
      <Header />
      <Playground name="passerelle-bridge" />
    </section>

    <section>
      <router-view />
    </section>
  </div>
</template>

<style scoped>
section {
  line-height: 1.5;
}

div {
  height: 95vh;
  width: inherit;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}
</style>

