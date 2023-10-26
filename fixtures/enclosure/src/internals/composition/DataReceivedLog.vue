<script lang="ts">
import { defineComponent, computed } from 'vue-demi'
import { useCommunicator, onReceivedData} from '@passerelle/enclosure-vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup({ name }) {
    const communicator = computed(() => {
      if (location.pathname.startsWith('/bridge')) {
        return useCommunicator('data-sender');
      }
      return undefined;
    })

    const exists = computed(() => !!communicator.value);

    onReceivedData(name, 'data-sender', (data) => {
      console.log('data received', data);
    });

    return {
      communicator,
      exists
    }
  }
})
</script>

<template>
  <section>
    <template v-if="exists">
      <p>see console</p>
    </template>
    <template v-else>
      <p>communicator nor found</p>
    </template>
  </section>
</template>
