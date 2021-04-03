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
  name: 'ExampleComponent',
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
  computed: {
    blockInfo () {
      return 'test block info'
    }
  },
  describeBlock () {
    return {
      name: 'Example',
      icon: 'code',
      defaultValue: 'this is default value',
      actions: {
        alignLeft: {
          btn: {
            icon: 'format_align_left',
          },
          tooltip: 'test',
        },
        alignCenter: {
          btn: {
            icon: 'format_align_center',
          },
          tooltip: 'test',
        },
        alignRight: {
          btn: {
            icon: 'format_align_right',
          },
          tooltip: 'test',
        },
      },
    }
  }
}
</script>
