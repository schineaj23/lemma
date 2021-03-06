<script>
import MathCard from "./MathCard.vue";
import Response from './Response.vue'

const API_URL =
  "https://5000-schineaj23-lemmabackend-ld59upr47fq.ws-us54.gitpod.io";

export default {
  components: { MathCard, Response },
  data() {
    return {
      operations: [
        'integral',
        'derivative',
        'simplify',
        'solve'
      ],
      currentOperation: "simplify",
      steps: [],
      display: "x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}",
      mathInput: "",
      correct: false,
      renderResult: false
    };
  },
  methods: {
    async instantEvaluate() {
      const request = new Request(`${API_URL}/${this.currentOperation}`, {
        method: "POST",
        body: JSON.stringify({ expr: this.mathInput }),
        headers: { "Content-Type": "application/json" },
      });
      let response = await fetch(request).then((res) => res.json());
      this.display = response["result"];
    },
    async submitWork() {
      if(this.steps.length == 0)
        return;

      // The last element is designated as the "guess" or solution to the problem
      this.steps[this.steps.length - 1].type = "guess";

      console.log(this.steps);

      // Send this data to the server
      const request = new Request(`${API_URL}/submit_work`, {
        method: "POST",
        body: JSON.stringify({
          "operation": this.currentOperation,
          "steps": this.steps}),
        headers: { "Content-Type": "application/json" },
      });

      let response = await fetch(request)
        .then((res) => res.json())
        .catch((err) => console.err(err));
      this.correct = response["result"] == "true";
      this.renderResult = true;
    },
    addWork() {
      this.renderResult = false;
      // The first element is designated as the "initial" or problem that we're trying to solve
      if (this.mathInput == "") return;

      this.steps.push({
        expr: this.mathInput,
        type: this.steps.length > 0 ? "step" : "initial",
      });
    },
  },
};
</script>

<template>
  <math-card :expr="display" caption="Debug Request Result" />

  <div class="step-container">
    <div v-for="(step, index) in steps" :key="step" class="step">
      <math-card :expr="step.expr" 
        :caption="index == 0 ? `Problem` : index == steps.length-1 ? `Guess` : `Step ${index}`" />

      <!-- Need to style this later. -->
      <!-- <button @click="steps.splice(index, 1)">Remove</button> -->
      <span class="material-symbols-rounded remove-button" @click="steps.splice(index, 1)"> close </span>
    </div>
  </div>

  <code id="code" class="latex-preview">{{ mathInput }}</code>
  <math-field
    :options="{ smartFence: true }"
    v-model="mathInput"
  ></math-field>

  <Response :correct="correct" v-if="renderResult" />
  
  <select class="operation-chooser" v-model="currentOperation">
    <option v-for="operation in operations" :key="operation" :value="operation">{{operation}}</option>
  </select>
  <button @click="addWork">
    {{ steps.length > 0 ? "Add Work" : "Enter Problem" }}
  </button>
  <button v-if="steps.length > 0" @click="submitWork">Submit Work</button>
  <button v-else @click="instantEvaluate">Evaluate</button>
</template>

<style>
math-field {
  width: 12em;
  font-size: 32px;
  margin: 1em;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
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

.remove-button {
  color: var(--vt-c-text-light-1)
}
</style>
