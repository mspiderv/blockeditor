<template>
  <q-input
    class="q-px-md custom-height"
    borderless
    autogrow
    :model-value="modelValue.text"
    placeholder="Type here ..."
    @update:model-value="updateText"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object,
    }
  },
  setup (props, ctx) {
    function update (value) {
      ctx.emit('update:modelValue', value)
    }

    function updateLevel (level) {
      update({
        level,
        text: props.modelValue.text,
      })
    }

    function updateText (text) {
      update({
        level: props.modelValue.level,
        text,
      })
    }

    return {
      update,
      updateLevel,
      updateText,
      h1: updateLevel.bind(null, 1),
      h2: updateLevel.bind(null, 2),
      h3: updateLevel.bind(null, 3),
      h4: updateLevel.bind(null, 4),
      h5: updateLevel.bind(null, 5),
      h6: updateLevel.bind(null, 6),
    }
  },
  blockDefinition: {
    name: 'Heading',
    icon: 'text_fields',
    defaultValue: {
      level: 1,
      text: '',
    },
  },
  blockActions (value) {
    return {
      h1: { btn: { label: 'H1', size: 'md', color: value.level === 1 ? 'black' : 'grey' } },
      h2: { btn: { label: 'H2', size: 'md', color: value.level === 2 ? 'black' : 'grey' } },
      h3: { btn: { label: 'H3', size: 'md', color: value.level === 3 ? 'black' : 'grey' } },
      h4: { btn: { label: 'H4', size: 'md', color: value.level === 4 ? 'black' : 'grey' } },
      h5: { btn: { label: 'H5', size: 'md', color: value.level === 5 ? 'black' : 'grey' } },
      h6: { btn: { label: 'H6', size: 'md', color: value.level === 6 ? 'black' : 'grey' } },
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
