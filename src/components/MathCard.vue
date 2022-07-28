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

<template>
  <div class="equation-container">
    <katex-display :expr="expr"/>
    <h4 class="expr-caption">{{caption}}</h4>
  </div>
</template>

<style>
  .equation-container {
    background-color: var(--vt-c-white-soft);
    border: 2px solid var(--vt-c-divider-light-2);
    border-radius: 10px;
    width: auto;
    max-width: 300px;
    padding: 1em 1em 1em;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 1em;
  }

  /* for controlling the color of mathtext */
  .katex {
    color: var(--vt-c-text-light-1);
  }
  
  .expr-caption {
    margin-bottom: 0.1em;
    color: var(--vt-c-text-light-1);
  }
</style>