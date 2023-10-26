<template>
  <form @submit.prevent="send">
    <JsonEditor
      v-model="data"
      class="editor" />
    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import type { Json } from '@passerelle/insider-vue'
import JsonEditor from 'json-editor-vue'

export default defineComponent({
  components: {
    JsonEditor
  },
  data(): { data: Json } {
    return {
      data: {}
    }
  },
  methods: {
    send() {
      // FIXME: #9 cannot access  type safety
      (this as any).$passerelle.sendData('data-sender', this.data)
      this.data = {}
    }
  }
})
</script>

<style scoped>
form {
  height: 80%;
}

.editor {
  height: 95%;
}
</style>
