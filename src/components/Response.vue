<script>
export default {
    props: {
        correct: Boolean
    }
}
</script>

<template>
  <div class="response-box" :class="[correct ? 'correct' : 'incorrect']">
    {{ correct ? "Correct" : "Incorrect" }}
  </div>
</template>

<style>
.response-box {
    border: 2px solid var(--vt-c-divider-light-2);
    border-radius: 10px;
    width: auto;
    max-width: 300px;
    padding: 1em 1em 1em;
    color:black;
}

.correct {
  background-color:palegreen;
}

.incorrect {
  background-color:indianred;
}
</style>