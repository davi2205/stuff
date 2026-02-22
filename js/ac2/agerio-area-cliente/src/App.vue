<template>
    <SideBar />
  <div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import { useCounterStore } from './stores/counter';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'App',
  components: {
    SideBar,
  },
  computed: {
    ...mapState(useCounterStore, ['count', 'doubleCount']),
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement']),
  },
};
</script>

<style scoped></style>
