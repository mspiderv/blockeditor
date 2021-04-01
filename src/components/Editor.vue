<template>
  <q-field label="Test Label" stack-label borderless>
    <template v-slot:control>

      <!-- Tools -->
      <q-card class="full-width q-mt-sm">
        <q-toolbar class="q-px-sm">
          <q-btn
            flat
            round
            v-for="(block, blockName) of blocks"
            :key="blockName"
            :icon="block.describeBlock().icon"
            @click="createBlock(blockName)"
          >
            <q-tooltip>{{ block.describeBlock().name }}</q-tooltip>
          </q-btn>
        </q-toolbar>
      </q-card>

      <q-toolbar class="justify-around" v-if="modelValue.length === 0">
        <span class="text-bold text-grey-5">No blocks</span>
      </q-toolbar>

      <!-- Render blocks -->
      <q-card
        class="full-width q-mt-md"
        v-for="(block, index) of modelValue"
        :key="index"
      >
        <!-- Header -->
        <q-toolbar class="q-px-sm bg-grey-2 justify-between">
          <div>
            <q-btn flat round icon="drag_handle" />
            <span class="text-bold q-mr-md">Paragraph</span>
            <!-- Title buttons -->
            <q-btn flat round size="sm" icon="format_align_left" />
            <q-btn flat round size="sm" icon="format_align_center" />
            <q-btn flat round size="sm" icon="format_align_right" />
          </div>
          <div>
            <q-btn flat round icon="content_copy" @click="copyBlock(block, index)">
              <q-tooltip>Copy block</q-tooltip>
            </q-btn>
            <q-btn flat round icon="delete" @click="deleteBlock(block, index)">
              <q-tooltip>Delete block</q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>

        <!-- Content -->
        <q-card-section class="q-pa-none">
          <component
            :is="blocks[block.type]"
            v-model="block.data"
          />
        </q-card-section>
      </q-card>

    </template>
  </q-field>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BlockEditorComponent',
  emits: [
    'update:modelValue',
  ],
  props: {
    blocks: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    }
  },
  setup (props, ctx) {

    function cloneBlockData (data) {
      // TODO: deep object clone
      return { ... data }
    }

    function createBlock (blockName) {
      console.log('createBlock', blockName)
      ctx.emit('update:modelValue', [
        ...props.modelValue,
        {
          type: blockName,
          data: props.blocks[blockName].describeBlock().defaultValue || null,
        }
      ])
    }

    function copyBlock (block, index) {
      const value = [...props.modelValue]
      value.splice(index, 0, cloneBlockData(block))
      ctx.emit('update:modelValue', value)
    }

    function deleteBlock (block, index) {
      ctx.emit('update:modelValue', props.modelValue.filter((block, indexToDelete) => index !== indexToDelete))
    }

    return {
      createBlock,
      copyBlock,
      deleteBlock,
    }
  }
}
</script>
