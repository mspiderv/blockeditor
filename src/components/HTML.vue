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
export default {
  name: 'HTMLComponent',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
    }
  },
  describeBlock () {
    return {
      name: 'HTML',
      icon: 'code',
      defaultValue: '',
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-height ::v-deep(.q-field__control-container)
  padding-top: 19px
  padding-bottom: 16px

  textarea
    padding-bottom: 0
</style>

