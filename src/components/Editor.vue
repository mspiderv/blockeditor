<template>
  <q-field
    stack-label
    borderless
  >
    <template v-slot:control>
      <q-card class="full-width q-mt-sm">
        <draggable
          :group="draggableGroup"
          :list="modelValue"
          handle=".draggable-handle"
          :item-key="blockKey"
          ghost-class="bg-grey-6"
          @update="update(modelValue)"
        >
          <!-- Tools -->
          <template #header>
            <q-toolbar class="q-px-sm justify-between">
              <!-- Left buttons -->
              <div>
                <q-btn
                  flat
                  round
                  v-for="(block, blockName) of blocks"
                  :key="blockName"
                  :icon="block.blockDefinition.icon"
                  @click="createBlock(blockName)"
                >
                  <q-tooltip>{{ block.blockDefinition.name }}</q-tooltip>
                </q-btn>
              </div>
              <!-- Right buttons -->
              <div>
                <q-btn
                  flat
                  round
                  icon="copy_all"
                  v-if="withCopy"
                  :disable="modelValue.length === 0"
                  @click="copyAllBlocks()"
                >
                  <q-tooltip>Copy content</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  icon="content_paste"
                  v-if="withPaste"
                  @click="pasteContent()"
                >
                  <q-tooltip>Paste content</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  icon="clear_all"
                  :disable="modelValue.length === 0"
                  @click="deleteAllBlocks()"
                >
                  <q-tooltip>Delete all blocks</q-tooltip>
                </q-btn>
              </div>
            </q-toolbar>
          </template>
          <!-- Render blocks -->
          <template #item="{ element, index }">
            <div :class="{ 'invisible-block': withVisibility && !element.visible }">
              <!-- Header -->
              <q-toolbar class="q-px-sm justify-between block-toolbar">
                <div class="row items-center">
                  <q-icon size="sm" name="drag_indicator" class="q-ml-xs cursor-pointer draggable-handle" />
                  <span class="text-bold q-mx-md">{{ blocks[element.type].blockDefinition.name }}</span>
                  <!-- Actions -->
                  <div :ref="ref => setActionsRef(index, ref)"></div>
                </div>
                <div>
                  <q-toggle
                    v-model="element.visible"
                    checked-icon="visibility"
                    unchecked-icon="visibility_off"
                    color="grey-8"
                    v-if="withVisibility"
                  >
                    <q-tooltip>Block is {{ element.visible ? 'visible' : 'invisible' }}</q-tooltip>
                  </q-toggle>
                  <q-btn flat round size="sm" icon="content_copy" @click="duplicateBlock(element, index)">
                    <q-tooltip>Duplicate block</q-tooltip>
                  </q-btn>
                  <q-btn flat round size="sm" icon="close" @click="deleteBlock(element, index)">
                    <q-tooltip>Delete block</q-tooltip>
                  </q-btn>
                </div>
              </q-toolbar>

              <!-- Content -->
              <component
                v-if="actionRefs[index]"
                :ref="ref => setBlockRef(index, ref)"
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

// Copy
import copy from 'clipboard-copy'
let nextEditorId = 1
const clipboardPrefix = 'block-editor-content:'

// Export Basic Blocks
import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'
import Wysiwyg from 'components/Wysiwyg'
import Delimiter from 'components/Delimiter'
import HTML from 'components/HTML'
export const basicBlocks = {
  Heading,
  Paragraph,
  Wysiwyg,
  Delimiter,
  HTML,
}

export default defineComponent({
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
    const blockRefs = {}

    function cloneBlockData (data) {
      return JSON.parse(JSON.stringify(data))
    }

    function createBlock (blockName) {
      const cfg = props.blocks[blockName].blockDefinition
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

    function setBlockRef (index, ref) {
      blockRefs[index] = ref
    }

    function callBlockAction (block, index, actionName) {
      blockRefs[index][actionName]()
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
            message: 'Content pasting failed. Make sure that the content you are pasting was previously received using the "Copy content" functionality.',
          })
        }
      })
    }

    const actionRefs = reactive({})
    function setActionsRef (index, ref) {
      actionRefs[index] = ref
    }

    return {
      update,
      toJSON,
      createBlock,
      duplicateBlock,
      deleteBlock,
      deleteAllBlocks,
      setBlockRef,
      callBlockAction,
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
