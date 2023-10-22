<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import { useFrameLayout } from '@passerelle/insider-vue'

export default defineComponent({
  setup() {
    const layout = useFrameLayout()

    return {
      windowHeight: computed<number>(() => layout.enclosure.window.height),
      windowWidth: computed<number>(() => layout.enclosure.window.width),
      iframeHeight: computed<number>(() => layout.insider.window.height),
      iframeWidth: computed<number>(() => layout.insider.window.width),
      iframeTop: computed<number>(() => layout.insider.offset.top),
      iframeLeft: computed<number>(() => layout.insider.offset.left)
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
