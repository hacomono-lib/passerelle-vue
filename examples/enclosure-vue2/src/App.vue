<script lang="ts">
import { defineComponent } from 'vue-demi'
import Header from './components/Header.vue'
import { Playground } from 'fixtures-enclosure'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Playground
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
