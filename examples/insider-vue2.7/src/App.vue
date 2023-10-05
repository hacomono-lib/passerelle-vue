<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Playground from 'fixtures-vue-components'

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
    <Playground mode="insider" />
  </section>
</template>

<style scoped>
section {
  line-height: 1.5;
  height: 95vh;
}
</style>
