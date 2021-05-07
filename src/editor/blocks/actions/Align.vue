<template>
  <template v-if="config.align">
    <q-btn
      flat
      round
      dense
      icon="format_align_left"
      :color="modelValue.align === 'left' ? 'black' : 'grey'"
      @click="update('left')"
    />
    <q-btn
      flat
      round
      dense
      icon="format_align_center"
      :color="modelValue.align === 'center' ? 'black' : 'grey'"
      @click="update('center')"
    />
    <q-btn
      flat
      round
      dense
      icon="format_align_right"
      :color="modelValue.align === 'right' ? 'black' : 'grey'"
      @click="update('right')"
    />
    <q-btn
      flat
      round
      dense
      icon="format_align_justify"
      :color="modelValue.align === 'justify' ? 'black' : 'grey'"
      @click="update('justify')"
    />
  </template>
</template>

<script>
import { defineComponent } from 'vue'

export const alignDefaultConfig = {
  align: true,
}

export function alignDefaultValue (config) {
  return config.align
    ? { align: 'left' }
    : {}
}

export default defineComponent({
  name: 'AlignActionComponent',
  emits: [
    'update:modelValue',
  ],
  props: {
    modelValue: {
      type: Object,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  setup (props, ctx) {
    return {
      update (align) {
        ctx.emit('update:modelValue', {
          ...props.modelValue,
          align,
        })
      }
    }
  },
})
</script>
