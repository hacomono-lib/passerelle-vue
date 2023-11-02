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
import { defineComponent } from 'vue-demi'
import { useCommunicator, onReceivedData } from '@passerelle/enclosure-vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    communicator() {
      if (location.pathname.startsWith('/bridge')) {
        return useCommunicator('data-sender');
      }
      return undefined;
    },
    exists() {
      return !!this.communicator;
    }
  },
  mounted() {
    onReceivedData(this.name, 'data-sender', (data) => {
      console.log('data received', data);
    });
  }
})
</script>
