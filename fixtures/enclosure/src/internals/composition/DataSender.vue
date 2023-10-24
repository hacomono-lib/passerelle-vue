<script lang="ts">
import { defineComponent, ref } from 'vue'
import { sendData, type Json } from '@passerelle/enclosure-vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup({ name }) {
    const data = ref('')

    function send() {
      const json = JSON.parse(data.value)
      sendData(name, 'data-sender', json)
      data.value = ''
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
    <textarea
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
