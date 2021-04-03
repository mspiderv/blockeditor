<template>
  <q-field
    stack-label
    borderless
  >
    <template v-slot:control>
      <q-card class="full-width q-mt-sm">
        <draggable
          :group="draggableGroup"
          v-model="modelValue"
          handle=".draggable-handle"
          :item-key="blockKey"
          ghost-class="bg-grey-6"
          @update="$emit('update:modelValue', modelValue)"
        >
          <!-- Tools -->
          <template #header>
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
          </template>
          <!-- Render blocks -->
          <template #item="{ element, index }">
            <div :class="{ 'invisible-block': !element.visible }">
              <!-- Header -->
              <q-toolbar class="q-px-sm justify-between block-toolbar">
                <div>
                  <q-icon size="sm" name="drag_handle" class="q-ml-xs cursor-pointer draggable-handle" />
                  <span class="text-bold q-mx-md">Paragraph</span>
                  <!-- Actions -->
                  <q-btn
                    v-for="(action, actionName) of blocks[element.type].describeBlock().actions"
                    flat
                    round
                    size="sm"
                    v-bind="action"
                    @click="callBlockAction(element, index, actionName)"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="element.visible"
                    checked-icon="visibility"
                    unchecked-icon="visibility_off"
                    color="positive"
                  >
                    <q-tooltip>Block is {{ element.visible ? 'visible' : 'invisible' }}</q-tooltip>
                  </q-toggle>
                  <q-btn flat round size="sm" icon="content_copy" @click="copyBlock(element, index)">
                    <q-tooltip>Copy block</q-tooltip>
                  </q-btn>
                  <q-btn flat round size="sm" icon="delete" @click="deleteBlock(element, index)">
                    <q-tooltip>Delete block</q-tooltip>
                  </q-btn>
                </div>
              </q-toolbar>

              <!-- Content -->
              <component
                :ref="ref => setBlockRef(index, ref)"
                :is="blocks[element.type]"
                v-model="element.data"
              />
            </div>
          </template>
        </draggable>
      </q-card>
    </template>
  </q-field>
</template>

<script>
import { useQuasar } from 'quasar'
import Draggable from 'vuedraggable'

export default {
  name: 'BlockEditorComponent',
  emits: [
    'update:modelValue',
  ],
  components: {
    Draggable,
  },
  props: {
    blocks: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    draggableGroup: {
      type: String,
      default: 'blockeditor-group',
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
      ctx.emit('update:modelValue', [
        ...props.modelValue,
        {
          type: blockName,
          data: props.blocks[blockName].describeBlock().defaultValue ?? null,
          visible: props.blocks[blockName].describeBlock().defaultVisibility ?? true,
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

    function blockKey (block) {
      return props.modelValue.indexOf(block)
    }

    return {
      createBlock,
      copyBlock,
      deleteBlock,
      setBlockRef,
      callBlockAction,
      blockKey,
    }
  }
}
</script>

<style lang="sass" scoped>
.block-toolbar
  background-color: rgba(0, 0, 0, 0.05)

.invisible-block
  opacity: 0.5
</style>
