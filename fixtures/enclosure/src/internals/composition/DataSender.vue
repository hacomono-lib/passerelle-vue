<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCommunicator, type Json } from '@passerelle/enclosure-vue'
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
  setup({ name }) {
    const communicator = computed(() => {
      if (location.pathname.startsWith('/bridge')) {
        return useCommunicator(name)
      }
      return undefined
    })

    const exists = computed(() => !!communicator.value)

    const data = ref<Json>({})

    function send() {
      if (!communicator.value) return

      communicator.value.sendData('data-sender', data.value)
      data.value = {}
    }

    return {
      communicator,
      send,
      data,
      exists
    }
  }
})
</script>

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
