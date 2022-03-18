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
    showBlockIcons: {
      type: Boolean,
      default: true,
    },
    showBlockLabels: {
      type: Boolean,
      default: false,
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
    color: {
      type: String,
      default: 'transparent',
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
    editorShowBlockIcons: {
      type: Boolean,
      required: true,
    },
    editorShowBlockLabels: {
      type: Boolean,
      required: true,
    },
    editorDraggableGroup: {
      type: String,
      required: true,
    },
    editorFlat: {
      type: Boolean,
      required: true,
    },
    editorColor: {
      type: String,
      required: true,
    },
    editorWithCopy: {
      type: Boolean,
      required: true,
    },
    editorWithPaste: {
      type: Boolean,
      required: true,
    },
    editorWithVisibility: {
      type: Boolean,
      required: true,
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
