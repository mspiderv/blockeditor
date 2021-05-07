<template>
  <q-field
    stack-label
    borderless
  >
    <template v-slot:control>
      <q-card class="full-width q-mt-sm">
        <editor-toolbar
          :blocks="blocks"
          :model-value="modelValue"
          :with-copy="withCopy"
          :with-paste="withPaste"
          @create-block="createBlock"
          @copy-all-blocks="copyAllBlocks"
          @paste-content="pasteContent"
          @delete-all-blocks="deleteAllBlocks"
        />
        <draggable
          :group="draggableGroup"
          :list="modelValue"
          handle=".draggable-handle"
          :item-key="blockKey"
          ghost-class="bg-grey-6"
          @update="update(modelValue)"
        >
          <template #item="{ element, index }">
            <div :class="{ 'invisible-block': withVisibility && !element.visible }">
              <editor-block-toolbar
                :block-definition="blocks[element.type].blockDefinition"
                :with-visibility="withVisibility"
                v-model:visible="element.visible"
                @duplicate-block="duplicateBlock(element, index)"
                @delete-block="deleteBlock(element, index)"
              >
                <template #prepend>
                  <q-icon size="sm" name="drag_indicator" class="q-ml-xs cursor-pointer draggable-handle" />
                </template>
                <template #actions>
                  <div :ref="ref => setActionsRef(index, ref)"></div>
                </template>
              </editor-block-toolbar>
              <component
                v-if="actionRefs[index]"
                :is="blocks[element.type]"
                v-model="element.data"
                :actionsRef="actionRefs[index]"
              />
            </div>
          </template>
        </draggable>
      </q-card>
    </template>
  </q-field>
</template>

<script>
// TODO: Layout manager (flex rows ...)
// TODO: TableBlock
// TODO: ImageBlock
// TODO: [AccordionBlock]
// TODO: [AlertBlock]
// TODO: [ButtonBlock]
// TODO: ked mam napr. prazdny Paragraf a chcem ho zmazat tak to vyhodi confirm, ale pre prazdny paragraf je ten confirm nepodstatny

import { useQuasar } from 'quasar'
import Draggable from 'vuedraggable'
import { defineComponent, reactive } from 'vue'

import * as allBlocks from './blocks'

import EditorToolbar from './EditorToolbar'
import EditorBlockToolbar from './EditorBlockToolbar'

import copy from 'clipboard-copy'
let nextEditorId = 1
const clipboardPrefix = 'block-editor-content:'

export default defineComponent({
  name: 'BlockEditorComponent',
  emits: [
    'update:modelValue',
  ],
  components: {
    Draggable,
    EditorToolbar,
    EditorBlockToolbar,
  },
  props: {
    blocks: {
      type: Object,
      required: false,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    draggableGroup: {
      type: String,
      default () {
        return `blockeditor-group-${nextEditorId++}`
      },
    },
    withCopy: {
      type: Boolean,
      default: false
    },
    withPaste: {
      type: Boolean,
      default: false
    },
    withVisibility: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const $q = useQuasar()

    const blocks = props.blocks || allBlocks

    function cloneBlockData (data) {
      return JSON.parse(JSON.stringify(data))
    }

    function createBlock (blockName) {
      const cfg = blocks[blockName].blockDefinition
      let newBlock = {
        type: blockName,
      }
      if (props.withVisibility) {
        newBlock.visible = cfg.defaultVisibility ?? true
      }
      if (cfg.hasOwnProperty('defaultValue')) {
        newBlock.data = cfg.defaultValue
      }
      update([
        ...props.modelValue,
        newBlock
      ])
    }

    function duplicateBlock (block, index) {
      const value = [...props.modelValue]
      value.splice(index, 0, cloneBlockData(block))
      update(value)
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
        update(props.modelValue.filter((block, indexToDelete) => index !== indexToDelete))
      })
    }

    function deleteAllBlocks () {
      $q.dialog({
        title: 'Delete all blocks ?',
        message: 'Do you really want to delete all blocks ?',
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
        update([])
      })
    }

    function update (value) {
      ctx.emit('update:modelValue', value)
    }

    function blockKey (block) {
      return props.modelValue.indexOf(block)
    }

    function toJSON () {
      return clipboardPrefix + JSON.stringify(props.modelValue)
    }

    async function copyAllBlocks () {
      await copy(toJSON())
      $q.notify({
        color: 'positive',
        message: 'Content copied !',
      })
    }

    function pasteContent () {
      $q.dialog({
        title: 'Paste content',
        message: 'You can paste the previously copied content here:',
        prompt: {
          model: '',
          type: 'text',
        },
        cancel: true,
      }).onOk(content => {
        try {
          if (!content.startsWith(clipboardPrefix)) throw new Error()
          const parsed = JSON.parse(content.substr(clipboardPrefix.length))
          if (!Array.isArray(parsed)) throw new Error()
          update(parsed)
        } catch (e) {
          $q.notify({
            color: 'negative',
            message: 'Content pasting failed. Make sure that the content you are pasting was previously received using the "Copy" functionality.',
          })
        }
      })
    }

    const actionRefs = reactive({})
    function setActionsRef (index, ref) {
      actionRefs[index] = ref
    }

    return {
      blocks,
      update,
      toJSON,
      createBlock,
      duplicateBlock,
      deleteBlock,
      deleteAllBlocks,
      blockKey,
      copyAllBlocks,
      pasteContent,

      setActionsRef,
      actionRefs,
    }
  }
})
</script>

<style lang="sass" scoped>
.block-toolbar
  background-color: rgba(0, 0, 0, 0.05)

.invisible-block
  opacity: 0.5
</style>
