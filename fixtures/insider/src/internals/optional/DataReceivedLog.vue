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

<script lang="ts">
import { defineComponent } from 'vue'
import { useCommunicator, onReceivedData} from '@passerelle/insider-vue';

export default defineComponent({
  computed: {
    communicator() {
      return useCommunicator();
    },
    exists() {
      return !!this.communicator;
    }
  },
  mounted() {
    onReceivedData('data-sender', (data) => {
      console.log('data received', data);
    });
  }
})
</script>
