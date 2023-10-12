<template>
  <section>
    <Tags
      :selected-tag="selectedTag"
      :selected-api="selectedApi"
      @select="selectTag" />
    <template v-if="isSelected('optional', 'transition-log')">
      <OptionalTransitionLog />
    </template>
    <template v-else-if="isSelected('optional', 'data-sender')">
      <OptionalDataSender />
    </template>
    <template v-else-if="isSelected('optional', 'data-received-log')">
      <OptionalDataReceivedLog />
    </template>
    <template v-else-if="isSelected('optional', 'layout-view')">
      <OptionalLayoutView />
    </template>
    <template v-else-if="isSelected('composition', 'transition-log')">
      <CompositionTransitionLog />
    </template>
    <template v-else-if="isSelected('composition', 'data-sender')">
      <CompositionDataSender />
    </template>
    <template v-else-if="isSelected('composition', 'data-received-log')">
      <CompositionDataReceivedLog />
    </template>
    <template v-else-if="isSelected('composition', 'layout-view')">
      <CompositionLayoutView />
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { tags, type TagName, type ApiType } from './type'
import Tags from './Tags.vue'
import CompositionTransitionLog from './composition/TransitionLog.vue'
import CompositionDataSender from './composition/DataSender.vue'
import CompositionDataReceivedLog from './composition/DataReceivedLog.vue'
import CompositionLayoutView from './composition/LayoutView.vue'
import OptionalTransitionLog from './optional/TransitionLog.vue'
import OptionalDataSender from './optional/DataSender.vue'
import OptionalDataReceivedLog from './optional/DataReceivedLog.vue'
import OptionalLayoutView from './optional/LayoutView.vue'

export default defineComponent({
  name: 'Playground',
  components: {
    Tags,
    CompositionDataReceivedLog,
    CompositionDataSender,
    CompositionTransitionLog,
    CompositionLayoutView,
    OptionalDataReceivedLog,
    OptionalDataSender,
    OptionalTransitionLog,
    OptionalLayoutView
  },
  data(): { selectedTag: TagName; selectedApi: ApiType } {
    return {
      selectedTag: 'transition-log',
      selectedApi: 'optional'
    }
  },
  computed: {
    tags() {
      return tags
    }
  },
  methods: {
    selectTag({ tag, api }: { tag: TagName; api: ApiType }) {
      this.selectedTag = tag
      this.selectedApi = api
    },
    isSelected(api: ApiType, tag: TagName): boolean {
      return this.selectedTag === tag && this.selectedApi === api
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
