<template>
  <q-page>
    <editor />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Editor from 'components/Editor'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Editor,
  }
})
</script>
