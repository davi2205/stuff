<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p>
    <button @click="increment">Count is: {{ count }}</button>
    <button @click="decrement">Decrement</button>
    <br />
    <span>Double count is: {{ doubleCount }}</span>
  </p>
</template>

<script>
import { useCounterStore } from './stores/counter';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'App',
  computed: {
    ...mapState(useCounterStore, ['count', 'doubleCount']),
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement']),
  },
};
</script>

<style scoped></style>
