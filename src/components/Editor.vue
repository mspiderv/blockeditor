<template>
  <q-field label="Test Label" stack-label borderless>
    <template v-slot:control>

      <!-- Tools -->
      <q-card class="full-width q-mt-sm">
        <q-toolbar class="q-px-sm">
          <q-btn flat round icon="title" />
          <q-btn flat round icon="list" />
          <q-btn flat round icon="movie" />
          <q-btn flat round icon="table_chart" />
          <q-btn flat round icon="segment" />
          <q-btn flat round icon="insert_photo" />
          <q-btn flat round icon="code" />
        </q-toolbar>
      </q-card>

      <!-- Block: Text -->
      <q-card class="full-width q-mt-md">
        <!-- Header -->
        <q-toolbar class="q-px-sm bg-grey-2 justify-between">
          <div>
            <q-btn flat round icon="drag_handle" />
            <span class="text-bold q-mr-md">Paragraph</span>
            <!-- Title buttons -->
            <q-btn flat round size="sm" icon="format_align_left" />
            <q-btn flat round size="sm" icon="format_align_center" />
            <q-btn flat round size="sm" icon="format_align_right" />
          </div>
          <q-btn flat round icon="delete" />
        </q-toolbar>

        <!-- Content -->
        <q-card-section class="q-pa-none">
          <q-input
            class="q-px-md"
            autogrow
            borderless
            type="textarea"
            v-model="a"
          />
        </q-card-section>
      </q-card>

      <!-- Block: Image -->
      <q-card class="full-width q-mt-md">
        <!-- Header -->
        <q-toolbar class="q-px-sm bg-grey-2 justify-between">
          <div>
            <q-btn flat round icon="drag_handle" />
            <span class="text-bold q-mr-md">Image</span>
            <!-- Image buttons -->
            <q-btn flat round size="sm" icon="format_align_left" />
            <q-btn flat round size="sm" icon="format_align_center" />
            <q-btn flat round size="sm" icon="format_align_right" />
          </div>
          <q-btn flat round icon="delete" />
        </q-toolbar>

        <!-- Content -->
        <q-card-section class="q-pa-none">

          <q-img
            src="https://images.unsplash.com/photo-1617134018521-1a25a54d8937?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          />
          <div class="q-pa-md">
            <q-input label="Description" v-model="b" />
          </div>
        </q-card-section>
      </q-card>

    </template>
  </q-field>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BlockEditorComponent',
  props: {
    //
  },
  setup () {
    const a = ref('Maecenas odio augue, finibus scelerisque egestas vitae, bibendum vitae ex. Maecenas malesuada risus sed finibus cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce orci tellus, mattis eu odio blandit, ultricies feugiat metus. Sed lacinia leo sed nunc viverra, ut gravida quam hendrerit. Integer congue, nulla ut eleifend ornare, purus augue maximus sem, eget efficitur neque ante id ligula. Nulla non dolor est. Cras ut dapibus nisi, nec facilisis tortor. Proin faucibus augue at nisi tincidunt interdum. Sed dapibus tincidunt imperdiet. Nunc sodales erat venenatis ipsum semper, at lacinia tellus mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Maecenas tincidunt, eros non suscipit mollis, purus nulla iaculis libero, eget ullamcorper arcu nisl sed elit. Donec aliquam a orci sed pharetra.')
    const b = ref('Some image description')

    return {
      a,
      b,
    }
  }
}
</script>
