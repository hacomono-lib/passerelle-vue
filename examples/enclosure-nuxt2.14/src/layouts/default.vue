<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Playground from 'fixtures-enclosure/src/internals/Playground.vue'

export default defineComponent({
  name: 'App',
  components: {
    // FIXME: typesafe にしたい
    Playground: Playground as any,
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
