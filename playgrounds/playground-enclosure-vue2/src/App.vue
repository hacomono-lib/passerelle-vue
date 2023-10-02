<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { RouterView } from '@intlify/vue-router-bridge'
import Header from './components/Header.vue'
import Playground from 'fixture-vue-component'

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
      <Playground mode="enclosure" />
    </section>

    <section>
      <RouterView />
    </section>
  </div>
</template>

<style scoped>
section {
  line-height: 1.5;
  height: 95vh;
}
</style>
