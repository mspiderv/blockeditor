<template>
  <q-page padding style="max-width: 1200px;">
    <editor
      :blocks="blocks"
      v-model="value"
    />
    <pre>value: {{ value }}</pre>
  </q-page>
</template>

<script>
import Editor from 'components/Editor'
import Paragraph from "components/Paragraph";
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    Editor,
  },
  setup () {
    const value = ref([])
    const blocks = {
      Paragraph,
    }

    return {
      value,
      blocks,
    }
  }
})
</script>
