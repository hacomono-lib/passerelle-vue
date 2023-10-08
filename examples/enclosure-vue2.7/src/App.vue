<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { EnclosurePlayground } from 'fixture-vue-component'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    EnclosurePlayground,
    RouterView
  }
})
</script>

<template>
  <div>
    <section>
      <Header />
      <EnclosurePlayground />
    </section>

    <section>
      <RouterView />
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
