<template>
  <form @submit.prevent="send">
    <textarea
      v-model="data"
      class="editor" />
    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { sendData, type Json } from '@passerelle/enclosure-vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: ''
    }
  },
  methods: {
    send() {
      const json = JSON.parse(this.data)

      sendData(this.name, 'data-sender', json)
      this.data = ''
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
