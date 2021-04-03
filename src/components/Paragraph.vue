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
  methods: {
    alignLeft () {
      console.log('alignLeft')
    },
    alignCenter () {
      console.log('alignCenter')
    },
    alignRight () {
      console.log('alignRight')
    },
  },
  describeBlock () {
    return {
      name: 'Paragraph',
      icon: 'title',
      defaultValue: 'this is default value',
      actions: {
        alignLeft: {
          icon: 'format_align_left',
        },
        alignCenter: {
          icon: 'format_align_center',
        },
        alignRight: {
          icon: 'format_align_right',
        },
      },
    }
  }
}
</script>
