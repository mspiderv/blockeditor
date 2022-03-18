<template />

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DelimiterBlockComponent',
  props: {
    draggableGroup: {
      type: String,
      required: true,
    },
    actionsRef: {
      type: HTMLElement,
      required: true,
    },
    modelValue: {
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  blockDefinition: {
    name: 'delimiter',
    title: 'Delimiter',
    icon: 'horizontal_rule',
  }
})
</script>
