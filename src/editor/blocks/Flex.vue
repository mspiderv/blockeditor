<template>

  <!-- Toolbar Actions -->
  <teleport :to="actionsRef">
    <q-btn
      flat
      round
      dense
      icon="view_stream"
      :color="modelValue.direction === 'row' ? 'black' : 'grey'"
      @click="updateDirection('row')"
    >
      <q-tooltip>Row layout</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      dense
      icon="view_column"
      :color="modelValue.direction === 'column' ? 'black' : 'grey'"
      @click="updateDirection('column')"
    >
      <q-tooltip>Column layout</q-tooltip>
    </q-btn>
    <q-separator vertical color="grey-4" class="q-mx-xs" inset />
    <q-btn
      flat
      round
      dense
      icon="add"
      @click="addSection"
    >
      <q-tooltip>Add layout section</q-tooltip>
    </q-btn>
  </teleport>

  <!-- Block Content -->
  <draggable
    :class="{ 'q-pb-sm': modelValue.sections.length }"
    :group="draggableGroupFlex"
    :list="modelValue.sections"
    handle=".draggable-handle"
    :item-key="itemKey"
    ghost-class="bg-grey-6"
    @update="override()"
  >
    <template #item="{ element, index }">
      <q-card
        class="item q-mx-sm q-mt-md q-mb-sm"
        :class="[
          sectionColor(element, index),
          { 'invisible-section': (editorWithVisibility && !element.visible) }
        ]"
      >
        <editor-block-toolbar
          icon=""
          :title="`${index + 1}. section`"
          v-model:visible="element.visible"
          :with-copy="editorWithCopy"
          :with-paste="editorWithPaste"
          :with-visibility="editorWithVisibility"
        >
          <template #prepend>
            <q-icon size="sm" name="drag_indicator" class="q-ml-xs cursor-pointer draggable-handle" />
          </template>
        </editor-block-toolbar>
        <editor
          v-show="!editorWithVisibility || element.visible || !config.collapseInvisibleSections"
          style="margin-top: -15px;"
          flat
          class="q-px-sm"
          v-model="element.data"
          :blocks="editorBlocks"
          :draggable-group="editorDraggableGroup"
          :with-copy="editorWithCopy"
          :with-paste="editorWithPaste"
          :with-visibility="editorWithVisibility"
        />
      </q-card>
    </template>
  </draggable>
</template>

<script>
import Editor from '../Editor'
import Draggable from 'vuedraggable'
import { defineComponent } from 'vue'
import EditorBlockToolbar from '../EditorBlockToolbar'
import { useBlock, withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'FlexBlockComponent',
  blockDefinition: {
    name: 'flex',
    title: 'Flex Layout',
    icon: 'auto_awesome_mosaic',
    defaultConfig: {
      defaultDirection: 'row',
      sectionColorStrength: 2,
      collapseInvisibleSections: true,
    },
    defaultValue (config) {
      return {
        direction: config.defaultDirection,
        sections: [],
      }
    },
  },
  emits: withBlockEmits(),
  props: withBlockProps(),
  components: {
    Editor,
    Draggable,
    EditorBlockToolbar,
  },
  setup (props, ctx) {
    const {
      update,
      override,
    } = useBlock(props, ctx)

    function updateDirection (direction) {
      override({ direction })
    }

    function addSection () {
      override({
        sections: [
          ...props.modelValue.sections,
          {
            data: [],
            visible: true,
          },
        ]
      })
    }

    /*
     * Draggable
     */
    function itemKey (block) {
      return props.modelValue.sections.indexOf(block)
    }

    // TODO
    const draggableGroupFlex = `blockeditor-group-flex`

    /*
     * Section colors
     */
    const sectionColors = [
      'blue',
      'green',
      'red',
      'amber',
      'teal',
      'deep-orange',
      'indigo',
      'cyan',
      'light-blue',
      'deep-purple',
      'lime',
      'pink',
      'light-green',
      'purple',
      'yellow',
      'brown',
      'blue-grey',
      'orange',
    ]
    function sectionColor (section, index) {
      const colorIndex = index % sectionColors.length
      return `bg-${sectionColors[colorIndex]}-${props.config.sectionColorStrength}`
    }

    return {
      update,
      override,
      updateDirection,
      addSection,
      itemKey,
      draggableGroupFlex,
      sectionColor,
    }
  },
})
</script>

<style lang="sass" scoped>
//.item:nth-child(2n)
//  background-color: transparent
//.item:nth-child(2n+1)
//  background-color: rgba(0, 0, 0, 0.05)
.item
  background-color: rgba(0, 0, 0, 0.05)

.invisible-section
  opacity: 0.5

</style>
