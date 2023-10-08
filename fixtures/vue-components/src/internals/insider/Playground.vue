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
import Tags from './optional/Tags.vue'
import TransitionLog from './optional/TransitionLog.vue'
import DataSender from './optional/DataSender.vue'
import DataReceivedLog from './optional/DataReceivedLog.vue'

const importMap = {
  'transition-log': 'TransitionLog',
  'data-sender': 'DataSender',
  'data-received-log': 'DataReceivedLog'
}

const tags = ['transition-log', 'layout-viewer', 'data-sender', 'data-received-log']

export default defineComponent({
  name: 'Playground',
  components: {
    Tags,
    TransitionLog,
    DataSender,
    DataReceivedLog
  },
  props: {
    /**
     * @type {'enclosure' | 'insider'}
     */
    api: {
      type: String,
      required: true,
    }
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
      console.log(tag)
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
