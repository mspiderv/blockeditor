<template>
  <q-input
    class="q-px-md"
    autogrow
    borderless
    type="textarea"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script>
export default {
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
      defaultValue: 'this is defaut value',
    }
  }
}
</script>
