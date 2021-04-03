<template>
  <div ref="editor" class="editor"></div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

// CodeMirror
import { keymap } from '@codemirror/view'
import { defaultTabBinding } from '@codemirror/commands'
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup'

// Theme
let theme = EditorView.theme({
  "&": {
    fontSize: '1.1em',
  },
  ".cm-line": {
    lineHeight: '2em',
  },
}, { dark: false })

// Langs
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import { javascript } from '@codemirror/lang-javascript'

const langs = {
  html,
  css,
  json,
  xml,
  javascript,
}

export default defineComponent({
  name: 'HTMLComponent',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
    },
    lang: {
      type: String,
      default: 'html'
    }
  },
  setup (props, ctx) {
    const editor = ref(null)

    onMounted(() => {
      const updateModelValue = EditorView.updateListener.of(({ state }) => {
        ctx.emit('update:modelValue', state.toJSON().doc)
      })

      const startState = EditorState.create({
        doc: props.modelValue,
        extensions: [
          theme,
          basicSetup,
          keymap.of([defaultTabBinding]),
          langs[props.lang](),
          updateModelValue,
        ],
      })

      const view = new EditorView({
        state: startState,
        parent: editor.value,
      })
    })

    return {
      editor,
    }
  },
  blockDefinition: {
    name: 'HTML',
    icon: 'code',
    defaultValue: '',
  }
})
</script>

<style lang="sass" scoped>
.editor ::v-deep(*)
  outline: none!important

.editor ::v-deep(.cm-editor .cm-content)
  cursor: text
</style>

