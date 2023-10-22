<template>
  <section>
    <h2>parent window</h2>
    <dl>
      <dt>Height</dt>
      <dd>{{ windowHeight }}px</dd>
      <dt>Width</dt>
      <dd>{{ windowWidth }}px</dd>
    </dl>
    <h2>iframe</h2>
    <dl>
      <dt>Height</dt>
      <dd>{{ iframeHeight }}px</dd>
      <dt>Width</dt>
      <dd>{{ iframeWidth }}px</dd>
      <dt>Top</dt>
      <dd>{{ iframeTop }}px</dd>
      <dt>Left</dt>
      <dd>{{ iframeLeft }}px</dd>
    </dl>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  computed: {
    windowHeight(): number {
      // FIXME: #9 cannot access  type safety
      return (this.$passerelle as any).layout.enclosure.window.height
    },
    windowWidth(): number {
      // FIXME: #9 cannot access  type safety
      return (this.$passerelle as any).layout.enclosure.window.width
    },
    iframeHeight(): number {
      // FIXME: #9 cannot access  type safety
      return (this.$passerelle as any).layout.insider.window.height
    },
    iframeWidth(): number {
      // FIXME: #9 cannot access  type safety
      return (this.$passerelle as any).layout.insider.window.width
    },
    iframeTop(): number {
      // FIXME: #9 cannot access  type safety
      return (this.$passerelle as any).layout.insider.offset.top
    },
    iframeLeft(): number {
      // FIXME: #9 cannot access  type safety
      return (this.$passerelle as any).layout.insider.offset.left
    }
  }
})
</script>


<style scoped>
dl {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

dt {
  width: 30%;
  font-weight: bold;
}

dd {
  width: 70%;
}
</style>
