<template>
  <q-editor
    :model-value="modelValue"
    min-height="5rem"
    class="cursor-text"
    :fonts="fonts"
    :toolbar="toolbar"
    @update:model-value="update"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useBlock, withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'WysiwygBlockComponent',
  blockDefinition: {
    name: 'wysiwyg',
    title: 'Rich Text',
    icon: 'wysiwyg',
    defaultValue: '',
  },
  emits: withBlockEmits(),
  props: withBlockProps(),
  setup (props, ctx) {
    const $q = useQuasar()

    const {
      update,
    } = useBlock(props, ctx)

    const toolbar = [
      [
        {
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: 'only-icons',
          options: ['left', 'center', 'right', 'justify']
        }
      ],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['token', 'hr', 'link', 'custom_btn'],
      ['print', 'fullscreen'],
      [
        {
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: [
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'code'
          ]
        },
        {
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7'
          ]
        },
        {
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana'
          ]
        },
        'removeFormat'
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

      ['undo', 'redo'],
      ['viewsource']
    ]

    const fonts = {
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    }

    return {
      update,
      toolbar,
      fonts,
    }
  },
})
</script>

<style lang="sass" scoped>
.cursor-text
  cursor: text
</style>
