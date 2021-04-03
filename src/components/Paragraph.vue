<template>
  <q-input
    class="q-px-md custom-height"
    borderless
    autogrow
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ParagraphComponent',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
    }
  },
  describeBlock () {
    return {
      name: 'Paragraph',
      icon: 'title',
      defaultValue: 'this is default value',
    }
  }
})
</script>

<style lang="sass" scoped>
.custom-height ::v-deep(.q-field__control-container)
  padding-top: 19px
  padding-bottom: 16px

  textarea
    padding-bottom: 0
</style>
