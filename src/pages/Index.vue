<template>
  <q-page padding>
    <div class="row q-gutter-x-lg">
      <editor
        :blocks="blocks"
        class="col"
        draggable-group="my-group"
        with-visibility
        with-copy
        with-paste
        label="My first editor"
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
        :blocks="blocks"
        class="col"
        draggable-group="my-group"
        with-visibility
        with-copy
        with-paste
        label="My second editor"
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
import Editor from 'src/editor/Editor'
import { defineComponent, ref } from 'vue'
import { Delimiter, Heading, HTML, Paragraph, Wysiwyg } from 'src/editor/blocks'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Editor,
  },
  setup () {
    // const value = ref([
    //   {
    //     "type": "Heading",
    //     "visible": true,
    //     "data": {
    //       "level": 1,
    //       "text": "Čarovná galéria"
    //     }
    //   },
    //   {
    //     "type": "Heading",
    //     "visible": true,
    //     "data": {
    //       "level": 2,
    //       "text": "Prečo si vybrať nás ?"
    //     }
    //   },
    //   {
    //     "type": "Wysiwyg",
    //     "visible": true,
    //     "data": "A teraz rich text"
    //   },
    //   {
    //     "type": "Paragraph",
    //     "visible": true,
    //     "data": "Toto je nejaký super text\n\nAko sa máš ?"
    //   },
    //   {
    //     "type": "HTML",
    //     "visible": true,
    //     "data": "kus html kódu"
    //   },
    //   {
    //     "type": "Delimiter",
    //     "visible": true
    //   },
    //   {
    //     "type": "Heading",
    //     "visible": true,
    //     "data": {
    //       "level": 2,
    //       "text": "Nejaký ďalší nadpis"
    //     }
    //   },
    //   {
    //     "type": "Paragraph",
    //     "visible": true,
    //     "data": "A ďalší text"
    //   }
    // ])
    const value = ref([])
    const value2 = ref([])

    const blocks = [
      {
        name: 'myCustomHeading',
        title: 'My Custom Heading',
        icon: 'face',
        component: Heading,
        config: {
          align: false,
          maxLevel: 3,
          placeholder: 'custom placeholder',
        }
      },
      { component: Heading },
      { component: Paragraph },
      { component: Wysiwyg },
      { component: Delimiter },
      { component: HTML },
    ]

    return {
      value,
      value2,
      blocks,
    }
  }
})
</script>
