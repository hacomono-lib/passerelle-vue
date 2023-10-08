<template>
  <section>
    <Tags
      :tags="tags"
      :selected="selectedTag"
      @select="selectTag" />
    <component :is="mainContent" />
  </section>
</template>

<script>
import { defineComponent } from 'vue-demi'
import Tags from './Tags.vue'
import TransitionLog from './TransitionLog.vue'
import DataSender from './DataSender.vue'
import DataReceivedLog from './DataReceivedLog.vue'

const importMap = {
  'transition-log': 'TransitionLog',
  'data-sender': 'DataSender',
  'data-received-log': 'DataReceivedLog'
}

const tags = ['transition-log', 'data-sender', 'data-received-log']

export default defineComponent({
  name: 'Playground',
  components: {
    Tags,
    TransitionLog,
    DataSender,
    DataReceivedLog
  },
  data() {
    return {
      /**
       * @type {import('./type').Tag}
       */
      selectedTag: 'transition-log'
    }
  },
  computed: {
    /**
     * @returns {readonly import('./type').Tag[]}
     */
    tags() {
      return tags
    },
    /**
     * @returns {string}
     */
    mainContent() {
      return importMap[this.selectedTag]
    }
  },
  methods: {
    /**
     *
     * @param {import('./type').Tag} tag
     */
    selectTag(tag) {
      this.selectedTag = tag
    }
  }
})
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
