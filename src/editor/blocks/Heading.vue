<template>
  <q-input
    class="q-px-md custom-height"
    borderless
    autogrow
    :model-value="modelValue.text"
    placeholder="Type here ..."
    @update:model-value="updateText"
  />
  <teleport :to="actionsRef">
    <q-btn
      v-for="level in 6"
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
        level: props.modelValue.level,
        ...(props.config.align ? { align: props.modelValue.align } : {}),
        text,
      })
    }

    function updateLevel (level) {
      update({
        level,
        ...(props.config.align ? { align: props.modelValue.align } : {}),
        text: props.modelValue.text,
      })
    }

    function updateAlign (align) {
      update({
        level: props.modelValue.level,
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
        level: 1,
        ...(config.align ? { align: 'left' } : {}),
        text: '',
      }
    },
    defaultConfig: {
      align: true,
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
