<template>
  <teleport :to="actionsRef">
    <align
      :config="config"
      :model-value="modelValue"
      @update:modelValue="update"
    />
  </teleport>
  <q-input
    class="q-px-md custom-height"
    borderless
    autogrow
    :placeholder="config.placeholder"
    :model-value="modelValue.text"
    @update:model-value="updateText"
  />
</template>

<script>
import { defineComponent } from 'vue'
import Align, { alignDefaultConfig, alignDefaultValue } from './actions/Align'
import { useBlock, withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'ParagraphBlockComponent',
  blockDefinition: {
    name: 'paragraph',
    title: 'Paragraph',
    icon: 'subject',
    defaultConfig: {
      ...alignDefaultConfig,
      placeholder: 'Type here...',
    },
    defaultValue (config) {
      return {
        ...alignDefaultValue(config),
        text: '',
      }
    },
    shouldConfirmDelete (config, value) {
      return value.text.length > 0
    },
  },
  emits: withBlockEmits(),
  props: withBlockProps(),
  components: {
    Align,
  },
  setup (props, ctx) {
    const {
      update,
    } = useBlock(props, ctx)

    function updateText (text) {
      update({
        ...props.modelValue,
        text,
      })
    }

    return {
      update,
      updateText,
    }
  },
})
</script>

<style lang="sass" scoped>
.custom-height ::v-deep(.q-field__control-container)
  padding-top: 19px
  padding-bottom: 16px

  textarea
    padding-bottom: 0
</style>
