<template>
  <nav>
    <div>
      Optional API:
      <p>
        <Tag
          v-for="t in tags"
          :key="t"
          :tag="t"
          :label="label(t)"
          :selected="selected('optional', t)"
          @click="select('optional', t)" />
      </p>
    </div>
    <div>
      Composition API:
      <p>
        <Tag
          v-for="t in tags"
          :key="t"
          :tag="t"
          :label="label(t)"
          :selected="selected('composition', t)"
          @click="select('composition', t)" />
      </p>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import type { PropType } from 'vue-demi'
import type { TagName, ApiType } from './type'
import Tag from './Tag.vue'

const labelSet = {
  'transition-log': 'Transition Log',
  'data-sender': 'Data Sender',
  'data-received-log': 'Data Received Log'
} satisfies Record<TagName, string>

const tags  = Object.keys(labelSet) as TagName[]

export default defineComponent({
  name: 'Tags',
  components: {
    Tag
  },
  props: {
    /**
     * vue3 との互換性のために、v-model ではなく select イベントを使う
     */
    selectedTag: {
      type: String as PropType<TagName>,
      required: true
    },

    selectedApi: {
      type: String as PropType<ApiType>,
      required: true
    }
  },
  emits: {
    select: (_: { api: ApiType, tag: TagName }) => true
  },
  methods: {
    label(tag: TagName): string {
      return labelSet[tag]
    },

    select(api: ApiType, tag: TagName) {
      this.$emit('select', { api, tag })
    },

    selected(api: ApiType, tag: TagName): boolean {
      return api === this.selectedApi && tag === this.selectedTag
    }
  },
  computed: {
    tags() {
      return tags
    }
  }
})
</script>

<style scoped>
nav {
  width: 100%;
  font-size: 11px;
  text-align: center;
}

div {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}

p {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 1rem;
}

.selected {
  text-decoration: underline;
}
</style>
