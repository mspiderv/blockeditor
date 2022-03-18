export function withBlockEmits () {
  return [
    'update:modelValue',
  ]
}

export function withBlockProps () {
  return {
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
    draggableGroup: {
      type: String,
      required: true,
    },
  }
}

export function useBlock (props, ctx) {
  function update(value) {
    ctx.emit('update:modelValue', value)
  }

  return {
    update,
  }
}
