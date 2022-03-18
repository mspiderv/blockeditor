<template />

<script>
import { defineComponent } from 'vue'
import { withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'DelimiterBlockComponent',
  blockDefinition: {
    name: 'delimiter',
    title: 'Delimiter',
    icon: 'horizontal_rule',
    defaultConfig: {
      //
    },
    defaultValue (config) {
      return undefined
    },
    shouldConfirmDelete (config, value) {
      return true
    },
  },
  emits: withBlockEmits(),
  props: withBlockProps(),
})
</script>
