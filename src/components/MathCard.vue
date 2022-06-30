<template>
  <katex-display :expr="expr"/>
  <h4>{{caption}}</h4>
</template>

<script>
import KatexDisplay from "./KatexDisplay.vue"

export default {
  components: { KatexDisplay },
  props: {
    expr: String,
    caption: String
  }
}
</script>

<style>

</style>