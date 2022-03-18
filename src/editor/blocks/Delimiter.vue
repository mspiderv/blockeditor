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
  },
  emits: withBlockEmits(),
  props: withBlockProps(),
})
</script>
