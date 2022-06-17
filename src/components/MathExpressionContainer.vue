<script>
import KatexDisplay from './KatexDisplay.vue'
const API_URL = "http://127.0.0.1:5000/simplify"

export default {
  components: { KatexDisplay },
    data() {
        return {
            display: 'x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}',
            formula: ""
        }
    },
    methods: {
        async updateFormula() {
            const request = new Request(API_URL, {
                method: 'POST',
                body: JSON.stringify({ expr: this.formula }),
                headers: { 'Content-Type': 'application/json' }
            })
            let response = await fetch(request).then((res) => res.json())
            this.display = response['result']
        }
    }
}
</script>

<template>
    <h1>lemma lololol</h1>
    <code class="latex-preview">{{ formula }}</code>
    <math-field :options="{ smartFence: true, virtualKeyboardMode: 'onfocus' }" v-model="formula"></math-field>
    <katex-display class="math-display" :expr="display"></katex-display>
    <button @click="updateFormula">Simplify</button>
</template>

<style>
math-field {
    width: 12em;
    font-size: 32px; 
    margin: 1em;
    padding: 10px; 
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, .3); 
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
}


.lemma-title {
    display: block;
    justify-self: center;
}

.math-display {
    position: absolute;
    padding: 0% 0% 0% 25%;
    /* i figured out how to center a div! */
    font-size: 2em;
}

/* need to figure out how to bind everything to the input box*/
.latex-preview {
    max-width: 10px;
}
</style>
