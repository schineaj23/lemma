<script>
import MathCard from "./MathCard.vue";
const API_URL = "https://5000-schineaj23-lemmabackend-ldvdgzsxbio.ws-us47.gitpod.io";

export default {
  components: { MathCard },
  data() {
    return {
      steps: [],
      display: "x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}",
      mathInput: "",
    };
  },
  methods: {
    async updateFormula() {
      const request = new Request(`${API_URL}/simplify`, {
        method: "POST",
        body: JSON.stringify({ expr: this.mathInput }),
        headers: { "Content-Type": "application/json" },
      });
      let response = await fetch(request).then((res) => res.json());
      this.display = response["result"];
    },
    async submitWork() {
      // The last element is designated as the "guess" or solution to the problem
      this.steps[this.steps.length - 1].type = "guess";

      // Send this data to the server
      const request = new Request(`${API_URL}/submit_work`, {
        method: "POST",
        body: JSON.stringify(this.steps),
        headers: { "Content-Type": "application/json" },
      });

      let response = await fetch(request)
        .then((res) => res.json())
        .catch((err) => console.err(err));
    },
    addWork() {
      // The first element is designated as the "initial" or problem that we're trying to solve
      if (this.mathInput == "") return;

      this.steps.push({
        expr: this.mathInput,
        type: this.steps.length > 0 ? "step" : "initial",
        caption: "This will be filled in later!",
      });
    },
  },
};
</script>

<template>
  <math-card :expr="display" caption="Debug Request Result" />

  <div v-for="(step, index) in steps" :key="step">
    <math-card :expr="step.expr" :caption="step.caption" />

    <!-- Need to style this later. -->
    <button @click="steps.splice(index, 1)">Remove</button>
  </div>

  <code id="code" class="latex-preview">{{ mathInput }}</code>
  <math-field
    :options="{ smartFence: true, virtualKeyboardMode: 'onfocus' }"
    v-model="mathInput"
  ></math-field>

  <button @click="updateFormula">Simplify</button>
  <button @click="addWork">
    {{ steps.length > 0 ? "Add Work" : "Enter Problem" }}
  </button>
  <button @click="submitWork">Submit Work</button>
</template>

<style>
math-field {
  width: 12em;
  font-size: 32px;
  margin: 1em;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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
