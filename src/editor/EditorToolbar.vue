<template>
  <q-toolbar class="q-px-sm justify-between">
    <div>
      <q-btn
        flat
        round
        v-for="(blockComponent, blockName) of blocks"
        :key="blockName"
        :icon="blockComponent.blockDefinition.icon"
        @click="$emit('createBlock', blockName)"
      >
        <q-tooltip>{{ blockComponent.blockDefinition.name }}</q-tooltip>
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
export default {
  name: 'EditorToolbarComponent',
  props: {
    blocks: {
      type: Object,
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
}
</script>
