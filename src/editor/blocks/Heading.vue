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
    <template v-if="config.align">
      <q-separator vertical color="grey-4" class="q-mx-xs" inset="" />
      <q-btn
        flat
        round
        dense
        icon="format_align_left"
        :color="modelValue.align === 'left' ? 'black' : 'grey'"
        @click="updateAlign('left')"
      />
      <q-btn
        flat
        round
        dense
        icon="format_align_center"
        :color="modelValue.align === 'center' ? 'black' : 'grey'"
        @click="updateAlign('center')"
      />
      <q-btn
        flat
        round
        dense
        icon="format_align_right"
        :color="modelValue.align === 'right' ? 'black' : 'grey'"
        @click="updateAlign('right')"
      />
      <q-btn
        flat
        round
        dense
        icon="format_align_justify"
        :color="modelValue.align === 'justify' ? 'black' : 'grey'"
        @click="updateAlign('justify')"
      />
    </template>
  </teleport>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeadingComponent',
  emits: ['update:modelValue'],
  props: {
    actionsRef: {
      type: HTMLElement,
      required: true,
    },
    modelValue: {
      type: Object,
    },
    config: {
      type: Object,
      required: true,
    }
  },
  setup (props, ctx) {
    function update (value) {
      ctx.emit('update:modelValue', value)
    }

    function updateText (text) {
      update({
        ...(props.config.levels ? { level: props.modelValue.level } : {}),
        ...(props.config.align ? { align: props.modelValue.align } : {}),
        text,
      })
    }

    function updateLevel (level) {
      update({
        ...(props.config.levels ? { level } : {}),
        ...(props.config.align ? { align: props.modelValue.align } : {}),
        text: props.modelValue.text,
      })
    }

    function updateAlign (align) {
      update({
        ...(props.config.levels ? { level: props.modelValue.level } : {}),
        ...(props.config.align ? { align } : {}),
        text: props.modelValue.text,
      })
    }

    return {
      update,
      updateText,
      updateLevel,
      updateAlign,
    }
  },
  blockDefinition: {
    name: 'heading',
    title: 'Heading',
    icon: 'text_fields',
    defaultValue (config) {
      return {
        ...(config.levels ? { level: config.defaultLevel } : {}),
        ...(config.align ? { align: 'left' } : {}),
        text: '',
      }
    },
    defaultConfig: {
      align: true,
      levels: true,
      defaultLevel: 1,
      maxLevel: 6,
      placeholder: 'Type here...',
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
