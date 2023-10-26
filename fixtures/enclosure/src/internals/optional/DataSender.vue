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
import { sendData, type Json } from '@passerelle/enclosure-vue'
import JsonEditor from 'json-editor-vue'

export default defineComponent({
  components: {
    JsonEditor
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },

  data(): { data: Json } {
    return {
      data: {}
    }
  },
  methods: {
    send() {
      sendData(this.name, 'data-sender', this.data)
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
