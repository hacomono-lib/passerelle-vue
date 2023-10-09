<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useCommunicator, onReceivedData} from '@passerelle/insider-vue';

export default defineComponent({
  setup() {
    const communicator = computed(() => useCommunicator())

    const exists = computed(() => !!communicator.value);

    onReceivedData('data-sender', (data) => {
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
