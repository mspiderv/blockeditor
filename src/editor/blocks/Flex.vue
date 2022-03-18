<template>
  <draggable
    :class="{ 'q-pb-sm': modelValue.items.length }"
    :group="draggableGroupFlex"
    :list="modelValue.items"
    handle=".draggable-handle"
    :item-key="itemKey"
    ghost-class="bg-grey-6"
    @update="override()"
  >
    <template #item="{ element, index }">
      <q-card class="item q-mx-md q-my-lg" flat>
        <editor-block-toolbar
          icon=""
          :title="`${index + 1}. item`"
          with-visibility
          v-model:visible="element.visible"
        >
          <template #prepend>
            <q-icon size="sm" name="drag_indicator" class="q-ml-xs cursor-pointer draggable-handle" />
          </template>
        </editor-block-toolbar>
        <editor
          flat
          with-visibility
          :draggable-group="draggableGroup"
          :blocks="blocks"
          v-model="element.data"
        />
      </q-card>
    </template>
  </draggable>
  <teleport :to="actionsRef">
    <q-btn
      flat
      round
      dense
      icon="view_stream"
      :color="modelValue.direction === 'row' ? 'black' : 'grey'"
      @click="updateDirection('row')"
    />
    <q-btn
      flat
      round
      dense
      icon="view_column"
      :color="modelValue.direction === 'column' ? 'black' : 'grey'"
      @click="updateDirection('column')"
    />
    <q-separator vertical color="grey-4" class="q-mx-xs" inset />
    <q-btn
      flat
      round
      dense
      icon="add"
      @click="addItem"
    />
  </teleport>
</template>

<script>
import { defineComponent } from 'vue'
import Editor from '../Editor'
import Draggable from 'vuedraggable'
import { Delimiter, Heading, HTML, Paragraph, Wysiwyg, } from './'
import EditorBlockToolbar from '../EditorBlockToolbar'
import { useBlock, withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'FlexBlockComponent',
  blockDefinition: {
    name: 'flex',
    title: 'Flex Layout',
    icon: 'auto_awesome_mosaic',
    defaultValue (config) {
      return {
        direction: config.defaultDirection,
        items: [],
      }
    },
    defaultConfig: {
      defaultDirection: 'row',
    }
  },
  emits: withBlockEmits(),
  props: withBlockProps(),
  components: {
    EditorBlockToolbar,
    Editor,
    Draggable,
  },
  setup (props, ctx) {
    const {
      update,
    } = useBlock(props, ctx)

    function override (data = {}) {
      update({
        ...props.modelValue,
        ...data,
      })
    }

    function updateDirection (direction) {
      override({ direction })
    }

    function addItem () {
      override({
        items: [
          ...props.modelValue.items,
          {
            data: [],
            visible: true,
          },
        ]
      })
    }

    const blocks = [
      {
        name: 'myCustomHeading',
        title: 'My Custom Heading',
        icon: 'face',
        component: Heading,
        config: {
          align: false,
          maxLevel: 3,
          placeholder: 'custom placeholder',
        }
      },
      { component: Heading },
      { component: Paragraph },
      { component: Wysiwyg },
      { component: Delimiter },
      { component: HTML },
      // { component: Flex },
    ]

    /*
     * Draggable
     */
    function itemKey (block) {
      return props.modelValue.items.indexOf(block)
    }

    // TODO
    const draggableGroupFlex = `blockeditor-group-flex`

    return {
      update,
      override,
      updateDirection,
      addItem,
      blocks,
      itemKey,
      draggableGroupFlex,
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
</style>
