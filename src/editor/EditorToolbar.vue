<template>
  <q-toolbar class="q-px-sm justify-between">
    <div>
      <q-btn
        flat
        round
        v-for="block of blocks"
        :key="block.name"
        :icon="block.icon"
        @click="$emit('createBlock', block)"
      >
        <q-tooltip>{{ block.title }}</q-tooltip>
      </q-btn>
    </div>
    <div>
      <q-btn
        flat
        round
        icon="copy_all"
        v-if="withCopy"
        :disable="modelValue.length === 0"
        @click="$emit('copyAllBlocks')"
      >
        <q-tooltip>Copy all blocks</q-tooltip>
      </q-btn>
      <q-btn
        flat
        round
        icon="content_paste"
        v-if="withPaste"
        @click="$emit('pasteContent')"
      >
        <q-tooltip>Paste content</q-tooltip>
      </q-btn>
      <q-btn
        flat
        round
        icon="clear_all"
        :disable="modelValue.length === 0"
        @click="$emit('deleteAllBlocks')"
      >
        <q-tooltip>Delete all blocks</q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'EditorToolbarComponent',
  props: {
    blocks: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    withCopy: {
      type: Boolean,
      required: true,
    },
    withPaste: {
      type: Boolean,
      required: true,
    }
  },
  emits: [
    'createBlock',
    'copyAllBlocks',
    'pasteContent',
    'deleteAllBlocks',
  ],
})
</script>
