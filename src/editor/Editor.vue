<template>
  <q-field
    stack-label
    borderless
  >
    <template v-slot:control>
      <q-card
        class="full-width"
        :class="[ { 'q-mt-sm': $attrs.label }, `bg-${color}` ]"
        :flat="flat"
      >
        <editor-toolbar
          :blocks="blocksForToolbar"
          :model-value="modelValue"
          :with-copy="withCopy"
          :with-paste="withPaste"
          @create-block="createBlock"
          @copy-all-blocks="copyAllBlocks"
          @paste-content="pasteContent"
          @delete-all-blocks="deleteAllBlocks"
        >
          <template #prepend>
            <slot name="toolbar-prepend" />
          </template>
          <template #append>
            <slot name="toolbar-append" />
          </template>
        </editor-toolbar>
        <draggable
          :group="draggableGroup"
          :list="modelValue"
          handle=".draggable-handle"
          :item-key="blockKey"
          ghost-class="bg-grey-6"
          @update="update(modelValue)"
        >
          <template #item="{ element, index }">
            <div class="block" :class="{ 'invisible-block': withVisibility && !element.visible }">
              <editor-block-toolbar
                :icon="resolveBlockIcon(element.type)"
                :title="resolveBlockTitle(element.type)"
                :with-visibility="withVisibility"
                v-model:visible="element.visible"
                @duplicate-block="duplicateBlock(element, index)"
                @delete-block="deleteBlock(element, index)"
              >
                <template #prepend>
                  <q-icon size="sm" name="drag_indicator" class="q-ml-xs cursor-pointer draggable-handle" />
                </template>
                <template #actions>
                  <div
                    class="row items-center"
                    :ref="ref => setActionsRef(index, ref)"
                  />
                </template>
              </editor-block-toolbar>
              <component
                v-if="actionRefs[index]"
                :is="getBlockByName(element.type).component"

                v-model="element.data"
                :config="getConfigForBlock(element.type)"
                :actions-ref="actionRefs[index]"

                :editor-blocks="blocks"
                :editor-draggable-group="draggableGroup"
                :editor-flat="flat"
                :editor-color="color"
                :editor-with-copy="withCopy"
                :editor-with-paste="withPaste"
                :editor-with-visibility="withVisibility"
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

import copy from 'clipboard-copy'
import Draggable from 'vuedraggable'
import { useQuasar } from 'quasar'
import EditorToolbar from './EditorToolbar'
import EditorBlockToolbar from './EditorBlockToolbar'
import { defineComponent, reactive, computed } from 'vue'
import { withEditorProps } from 'src/editor/composables/block'

// TODO: dat do configu ?
const clipboardPrefix = 'block-editor-content:'

export default defineComponent({
  name: 'BlockEditorComponent',
  // TODO: extrahovat do withEditorEmits()
  emits: [
    'update:modelValue',
    // TODO: copy & paste ?
  ],
  props: withEditorProps(),
  components: {
    Draggable,
    EditorToolbar,
    EditorBlockToolbar,
  },
  setup (props, ctx) {
    const $q = useQuasar()

    /*
     * Manage blocks
     */
    function createBlock ({ name }) {
      const blockDefinition = getBlockByName(name).component.blockDefinition
      let newBlock = {
        type: name,
      }
      if (props.withVisibility) {
        newBlock.visible = blockDefinition.defaultVisibility ?? true
      }
      if (blockDefinition.hasOwnProperty('defaultValue')) {
        newBlock.data = (typeof blockDefinition.defaultValue === 'function')
          ? blockDefinition.defaultValue(getConfigForBlock(name))
          : blockDefinition.defaultValue
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

    /*
     * Copy & paste
     */
    async function copyAllBlocks () {
      await copy(clipboardPrefix + JSON.stringify(props.modelValue))
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

    /*
     * Draggable
     */
    function blockKey (block) {
      return props.modelValue.indexOf(block)
    }

    /*
     * Getters
     */
    function getBlockByName (name) {
      return props.blocks.find((block) => block.name === name || (!block.name && block.component.blockDefinition.name === name))
    }

    function getConfigForBlock (name) {
      const block = getBlockByName(name)
      // TODO: config deep merge ?
      return {
        ...block.component.blockDefinition.defaultConfig,
        ...block.config
      }
    }

    /*
     * Resolvers
     */
    function resolveBlockIcon (name) {
      const block = getBlockByName(name)
      return block.icon ?? block.component.blockDefinition.icon
    }

    function resolveBlockTitle (name) {
      const block = getBlockByName(name)
      return block.title ?? block.component.blockDefinition.title
    }

    /*
     * Action refs
     */
    const actionRefs = reactive({})

    function setActionsRef (index, ref) {
      actionRefs[index] = ref
    }

    /*
     * Helpers
     */
    function cloneBlockData (data) {
      return JSON.parse(JSON.stringify(data))
    }

    function update (value) {
      ctx.emit('update:modelValue', value)
    }

    /*
     * Computed
     */
    const blocksForToolbar = computed(() => props.blocks.map((block) => {
      const name = block.name ?? block.component.blockDefinition.name
      return {
        name,
        icon: resolveBlockIcon(name),
        title: resolveBlockTitle(name),
      }
    }))

    return {
      blocksForToolbar,
      getBlockByName,
      update,
      createBlock,
      duplicateBlock,
      deleteBlock,
      deleteAllBlocks,
      blockKey,
      copyAllBlocks,
      pasteContent,
      getConfigForBlock,
      setActionsRef,
      actionRefs,
      resolveBlockIcon,
      resolveBlockTitle,
    }
  }
})
</script>

<style lang="sass" scoped>
.invisible-block
  opacity: 0.5

//.block:nth-child(2n+1)
//  background-color: rgba(0, 0, 0, 0.05)
</style>
