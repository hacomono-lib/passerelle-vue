<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { Playground } from 'fixtures-insider'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    RouterView,
    Playground
  }
})
</script>

<template>
  <section>
    <Header>
      <RouterView />
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
