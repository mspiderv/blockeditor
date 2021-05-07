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
      updateText,
      updateLevel,
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
})
</script>

<style lang="sass" scoped>
.custom-height ::v-deep(.q-field__control-container)
  padding-top: 19px
  padding-bottom: 16px

  textarea
    padding-bottom: 0
</style>
