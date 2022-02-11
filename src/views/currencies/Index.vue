<template>
  <main class="container my-4">
    <currencies-detail :slug="slug" />
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'Currencies',
  components: {
    CurrenciesDetail: defineAsyncComponent(() =>
      import(/* webpackChunkName: 'currencies-detail' */ './Detail')
    )
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  }
}
</script>
