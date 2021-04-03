<template>
  <q-page padding>
    <div class="row q-gutter-x-lg">
      <editor
        class="col"
        with-visibility
        label="My first editor"
        :blocks="blocks"
        v-model="value"
      />
      <q-card dark class="col q-mt-lg">
        <q-card-section>
          <pre>value: {{ value }}</pre>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-gutter-x-lg">
      <editor
        class="col"
        with-visibility
        label="My second editor"
        :blocks="blocks"
        v-model="value2"
      />
      <q-card dark class="col q-mt-lg">
        <q-card-section>
          <pre>value: {{ value2 }}</pre>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Editor from 'components/Editor'
import { defineComponent, ref } from 'vue'

import Example from 'components/Example'
import Paragraph from 'components/Paragraph'
import Delimiter from 'components/Delimiter'
import HTML from 'components/HTML'
import Wysiwyg from 'components/Wysiwyg'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Editor,
  },
  setup () {
    const value = ref([])
    const value2 = ref([])
    const blocks = {
      Paragraph,
      Wysiwyg,
      Delimiter,
      HTML,
      Example,
    }

    return {
      value,
      value2,
      blocks,
    }
  }
})
</script>
