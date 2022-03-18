<template>
  <q-toolbar class="q-px-sm justify-between block-toolbar">
    <div class="row items-center">
      <slot name="prepend" />
      <span class="text-bold q-mx-md">{{ title }}</span>
      <slot name="actions" />
    </div>
    <div>
      <q-toggle
        v-if="withVisibility"
        :model-value="visible"
        @update:model-value="$emit('update:visible', $event)"
        checked-icon="visibility"
        unchecked-icon="visibility_off"
        :color="visible ? 'positive' : 'grey-8'"
      >
        <q-tooltip>Block is {{ visible ? 'visible' : 'invisible' }}</q-tooltip>
      </q-toggle>
      <q-btn flat round size="sm" icon="content_copy" @click="$emit('duplicateBlock')">
        <q-tooltip>Duplicate block</q-tooltip>
      </q-btn>
      <q-btn flat round size="sm" icon="close" @click="$emit('deleteBlock')">
        <q-tooltip>Delete block</q-tooltip>
      </q-btn>
      <slot name="append" />
    </div>
  </q-toolbar>
</template>

<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'EditorBlockToolbarComponent',
  emits: [
    'update:visible',
    'duplicateBlock',
    'deleteBlock',
  ],
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    withVisibility: {
      type: Boolean,
      required: true,
    },
    visible: {
      type: Boolean,
      required: false,
    },
  },
})
</script>
<style lang="sass" scoped>
.block-toolbar
  background-color: rgba(0, 0, 0, 0.05)

//.block-toolbar
//  border-top: 1px solid rgba(0, 0, 0, 0.05)
</style>
