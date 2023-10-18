<template>
  /contact
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    test(): number {
      return this.$passerelle.layout.enclosure.window.height
    }
  }
})
</script>
