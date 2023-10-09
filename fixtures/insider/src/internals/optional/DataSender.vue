<template>
  <section>
    <template v-if="exists">
      <form @submit.prevent="send">
        <JsonEditor
          v-model="data"
          class="editor" />
        <button type="submit">Send</button>
      </form>
    </template>
    <template v-else>
      <p>communicator nor found</p>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCommunicator, sendData, type Json } from '@passerelle/insider-vue'
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
  computed: {
    communicator() {
      return useCommunicator()
    },

    exists() {
      return !!this.communicator
    }
  },

  methods: {
    send() {
      sendData('data-sender', this.data)
      this.data = {}
    }
  }
})
</script>

<style scoped>
section {
  height: 80%;
}

form {
  height: inherit;
}

.editor {
  height: 95%;
}
</style>
