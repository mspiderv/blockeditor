<template />

<script>
import { defineComponent } from 'vue'
import { withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'DelimiterBlockComponent',
  emits: withBlockEmits(),
  props: withBlockProps(),
  blockDefinition: {
    name: 'delimiter',
    title: 'Delimiter',
    icon: 'horizontal_rule',
  }
})
</script>
