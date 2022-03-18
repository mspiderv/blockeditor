let nextEditorId = 1

export function withBlockEmits () {
  return [
    'update:modelValue',
  ]
}

export function withEditorProps () {
  return {
    modelValue: {
      type: Array,
      required: true,
    },
    blocks: {
      type: Array,
      required: true,
    },
    draggableGroup: {
      type: String,
      default () {
        return `blockeditor-group-${nextEditorId++}`
      },
    },
    flat: {
      type: Boolean,
      default: false
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
  }
}

export function withBlockProps () {
  return {
    // Block props
    modelValue: {
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
    actionsRef: {
      type: HTMLElement,
      required: true,
    },

    // Editor props
    editorBlocks: {
      type: Array,
      required: true,
    },
    editorDraggableGroup: {
      type: String,
      default () {
        return `blockeditor-group-${nextEditorId++}`
      },
    },
    editorFlat: {
      type: Boolean,
      default: false
    },
    editorWithCopy: {
      type: Boolean,
      default: false
    },
    editorWithPaste: {
      type: Boolean,
      default: false
    },
    editorWithVisibility: {
      type: Boolean,
      default: false
    }
  }
}

export function useBlock (props, ctx) {
  function update(value) {
    ctx.emit('update:modelValue', value)
  }

  function override (data = {}) {
    update({
      ...props.modelValue,
      ...data,
    })
  }

  return {
    update,
    override,
  }
}
