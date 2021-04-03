<template>
  <q-page padding>
    <div class="row q-gutter-x-lg">
      <editor
        class="col"
        with-visibility
        label="Test label"
        :blocks="blocks"
        v-model="value"
      />
      <q-card dark class="col q-mt-lg">
        <q-card-section>
          <pre>value: {{ value }}</pre>
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

export default defineComponent({
  name: 'PageIndex',
  components: {
    Editor,
  },
  setup () {
    const value = ref([
      {
        "type": "Paragraph",
        "data": "this is default value 1",
        "visible": true
      },
      {
        "type": "Paragraph",
        "data": "this is default value 2",
        "visible": true
      },
      {
        "type": "Paragraph",
        "data": "this is default value 3",
        "visible": true
      },
      {
        "type": "HTML",
        "data": "<div>\n\ttest\n</div>",
        "visible": true
      }
    ])
    const blocks = {
      Example,
      Paragraph,
      Delimiter,
      HTML,
    }

    return {
      value,
      blocks,
    }
  }
})
</script>
