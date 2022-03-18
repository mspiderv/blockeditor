<template>
  <q-input
    class="q-px-md custom-height"
    borderless
    autogrow
    :placeholder="config.placeholder"
    :model-value="modelValue.text"
    @update:model-value="updateText"
  />
  <teleport :to="actionsRef">
    <q-btn
      v-if="config.levels"
      v-for="level in config.maxLevel"
      :key="level"
      flat
      round
      dense
      :label="`H${level}`"
      :color="modelValue.level === level ? 'black' : 'grey'"
      @click="updateLevel(level)"
    />
    <q-separator vertical color="grey-4" class="q-mx-xs" inset v-if="config.align" />
    <align
      :config="config"
      :model-value="modelValue"
      @update:modelValue="update"
    />
  </teleport>
</template>

<script>
import { defineComponent } from 'vue'
import Align, { alignDefaultConfig, alignDefaultValue } from './actions/Align'
import { useBlock, withBlockEmits, withBlockProps } from 'src/editor/composables/block'

export default defineComponent({
  name: 'HeadingBlockComponent',
  blockDefinition: {
    name: 'heading',
    title: 'Heading',
    icon: 'text_fields',
    defaultValue (config) {
      return {
        ...alignDefaultValue(config),
        ...(config.levels ? { level: config.defaultLevel } : {}),
        text: '',
      }
    },
    defaultConfig: {
      ...alignDefaultConfig,
      levels: true,
      defaultLevel: 1,
      maxLevel: 6,
      placeholder: 'Type here...',
    }
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

    function updateLevel (level) {
      update({
        ...props.modelValue,
        level,
      })
    }

    return {
      update,
      updateText,
      updateLevel,
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
