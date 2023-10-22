<script lang="ts">
import { defineComponent, ref } from 'vue'
import { sendData, type Json } from '@passerelle/insider-vue'
import JsonEditor from 'json-editor-vue'

export default defineComponent({
  components: {
    JsonEditor
  },
  setup() {
    const data = ref({} satisfies Json)

    function send() {
      sendData('data-sender', data.value)
      data.value = {}
    }

    return {
      send,
      data
    }
  }
})
</script>

<template>
  <form @submit.prevent="send">
    <JsonEditor
      v-model="data"
      class="editor" />
    <button type="submit">Send</button>
  </form>
</template>

<style scoped>
form {
  height: 80%;
}

.editor {
  height: 95%;
}
</style>
