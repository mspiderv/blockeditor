<template>
  <q-field
    stack-label
    borderless
  >
    <template v-slot:control>
      <q-card class="full-width q-mt-sm">
        <!-- Tools -->
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

        <!-- Render blocks -->
        <template
          v-for="(block, index) of modelValue"
          :key="index"
        >
          <!-- Header -->
          <q-toolbar class="q-px-sm bg-grey-2 justify-between">
            <div>
              <q-btn flat round icon="drag_handle" />
              <span class="text-bold q-mr-md">Paragraph</span>
              <!-- Actions -->
              <q-btn
                v-for="(action, actionName) of blocks[block.type].describeBlock().actions"
                flat
                round
                size="sm"
                v-bind="action"
                @click="callBlockAction(block, index, actionName)"
              />
            </div>
            <div>
              <q-btn flat round size="sm" icon="content_copy" @click="copyBlock(block, index)">
                <q-tooltip>Copy block</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" icon="delete" @click="deleteBlock(block, index)">
                <q-tooltip>Delete block</q-tooltip>
              </q-btn>
            </div>
          </q-toolbar>

          <!-- Content -->
          <component
            :ref="ref => setBlockRef(index, ref)"
            :is="blocks[block.type]"
            v-model="block.data"
          />
        </template>
      </q-card>
    </template>
  </q-field>
</template>

<script>
import { useQuasar } from 'quasar'

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
    const $q = useQuasar()
    const blockRefs = {}

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
      $q.dialog({
        title: 'Delete block ?',
        message: 'Do you really want to delete this block ?',
        cancel: {
          color: 'grey-7',
          flat: true,
        },
        ok: {
          label: 'Delete',
          color: 'negative',
          flat: true,
        }
      }).onOk(() => {
        ctx.emit('update:modelValue', props.modelValue.filter((block, indexToDelete) => index !== indexToDelete))
      })
    }

    function setBlockRef (index, ref) {
      blockRefs[index] = ref
    }

    function callBlockAction (block, index, actionName) {
      blockRefs[index][actionName]()
    }

    return {
      createBlock,
      copyBlock,
      deleteBlock,
      setBlockRef,
      callBlockAction,
    }
  }
}
</script>
