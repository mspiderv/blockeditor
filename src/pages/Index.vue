<template>
  <q-page padding>
    <q-toggle v-model="showSource" label="Show source" />
    <div class="row q-gutter-x-lg">
      <editor
        class="col"
        color="white"
        :blocks="blocks"
        v-model="value"
        label="My first editor"
        draggable-group="my-group"
        with-copy
        with-paste
        with-visibility
      />
      <q-card dark class="col q-mt-lg" v-show="showSource">
        <q-card-section>
          <pre>value: {{ value }}</pre>
        </q-card-section>
      </q-card>
    </div>
<!--    <div class="row q-gutter-x-lg">-->
<!--      <editor-->
<!--        :blocks="blocks"-->
<!--        class="col"-->
<!--        draggable-group="my-group"-->
<!--        with-visibility-->
<!--        with-copy-->
<!--        with-paste-->
<!--        label="My second editor"-->
<!--        v-model="value2"-->
<!--      />-->
<!--      <q-card dark class="col q-mt-lg">-->
<!--        <q-card-section>-->
<!--          <pre>value: {{ value2 }}</pre>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--    </div>-->
  </q-page>
</template>

<script>
import Editor from 'src/editor/Editor'
import { defineComponent, ref } from 'vue'
import { Delimiter, Heading, HTML, Paragraph, Wysiwyg, Flex } from 'src/editor/blocks'

export default defineComponent({
  name: 'PageIndex',
  components: {
    Editor,
  },
  setup () {
    const value = ref([
      {
        "type": "heading",
        "visible": true,
        "data": {
          "align": "center",
          "level": 1,
          "text": "Vitajte na našom webe !"
        }
      },
      {
        "type": "flex",
        "visible": true,
        "data": {
          "direction": "column",
          "sections": [
            {
              "data": [
                {
                  "type": "heading",
                  "data": {
                    "align": "left",
                    "level": 1,
                    "text": "Toto je náš obrázokk"
                  },
                  "visible": true
                },
                {
                  "type": "paragraph",
                  "data": {
                    "align": "left",
                    "text": "Na obrázku sú nejaké veci"
                  },
                  "visible": true
                }
              ],
              "visible": true
            },
            {
              "data": [
                {
                  "type": "html",
                  "data": "<img src=\"\" />",
                  "visible": true
                }
              ],
              "visible": true
            }
          ]
        }
      }
    ])
    // const value = ref([])
    const value2 = ref([])

    value.value = []

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
      { component: Flex },
    ]

    return {
      value,
      value2,
      blocks,
      showSource: ref(false),
    }
  }
})
</script>
