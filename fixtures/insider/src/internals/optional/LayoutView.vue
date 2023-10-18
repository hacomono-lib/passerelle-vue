<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  computed: {
    windowHeight(): number {
      return this.$passerelle.layout.enclosure.window.height
    },
    windowWidth(): number {
      return this.$passerelle.layout.enclosure.window.width
    },
    iframeHeight(): number {
      return this.$passerelle.layout.insider.window.height
    },
    iframeWidth(): number {
      return this.$passerelle.layout.insider.window.width
    },
    iframeTop(): number {
      return this.$passerelle.layout.insider.offset.top
    },
    iframeLeft(): number {
      return this.$passerelle.layout.insider.offset.left
    }
  }
})
</script>

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
