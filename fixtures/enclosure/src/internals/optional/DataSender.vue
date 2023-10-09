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
import { useCommunicator, sendData, type Json } from '@passerelle/enclosure-vue'
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
  computed: {
    communicator() {
      if (location.pathname.startsWith('/bridge')) {
        return useCommunicator(this.name)
      }
      return undefined
    },

    exists() {
      return !!this.communicator
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
