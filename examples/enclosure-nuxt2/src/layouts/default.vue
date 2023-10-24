<script lang="ts">
import { defineComponent } from 'vue'
import { Playground } from '../../node_modules/fixtures-enclosure'

export default defineComponent({
  name: 'App',
  components: {
    Playground,
  }
})
</script>

<template>
  <div id="layout-root">
    <section>
      <Header />
      <Playground name="passerelle-bridge" />
    </section>

    <section>
      <NuxtChild />
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
