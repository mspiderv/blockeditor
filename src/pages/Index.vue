<template>
  <q-page padding>
    <div class="row q-gutter-x-lg">
      <editor
        class="col"
        draggable-group="my-group"
        with-visibility
        with-copy
        with-paste
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
        draggable-group="my-group"
        with-visibility
        with-copy
        with-paste
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

import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'
import Wysiwyg from 'components/Wysiwyg'
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
        "type": "Heading",
        "visible": true,
        "data": {
          "level": 1,
          "text": "Čarovná galéria"
        }
      },
      {
        "type": "Heading",
        "visible": true,
        "data": {
          "level": 2,
          "text": "Prečo si vybrať nás ?"
        }
      },
      {
        "type": "Wysiwyg",
        "visible": true,
        "data": "A teraz rich text"
      },
      {
        "type": "Paragraph",
        "visible": true,
        "data": "Toto je nejaký super text\n\nAko sa máš ?"
      },
      {
        "type": "HTML",
        "visible": true,
        "data": "kus html kódu"
      },
      {
        "type": "Delimiter",
        "visible": true
      },
      {
        "type": "Heading",
        "visible": true,
        "data": {
          "level": 2,
          "text": "Nejaký ďalší nadpis"
        }
      },
      {
        "type": "Paragraph",
        "visible": true,
        "data": "A ďalší text"
      }
    ])
    const value2 = ref([])
    const blocks = {
      Heading,
      Paragraph,
      Wysiwyg,
      Delimiter,
      HTML,
    }

    return {
      value,
      value2,
      blocks,
    }
  }
})
</script>
