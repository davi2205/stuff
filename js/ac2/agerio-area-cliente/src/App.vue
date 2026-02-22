<template>
  <div>
    <SideBar @sidebar-state-changed="handleSidebarStateChange" />
    <div class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <div style="background-color: #6CB8DA; height: 67px;"></div>
      <h1>Área do Cliente</h1>
      <p>Contagem: {{ count }}</p>
      <p>Contagem dobrada: {{ doubleCount }}</p>
      <button @click="increment">Incrementar</button>
      <button @click="decrement">Decrementar</button>
    </div>
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
  data() {
    return {
      sidebarOpen: false
    }
  },
  computed: {
    ...mapState(useCounterStore, ['count', 'doubleCount']),
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement']),
    handleSidebarStateChange(isOpen) {
      this.sidebarOpen = isOpen
    }
  },
};
</script>

<style scoped>
.main-content {
  transition: margin-left 0.3s ease;
  margin-left: 0;
}

/* Desktop: offset content when sidebar is open */
@media (min-width: 768px) {
  .main-content.sidebar-open {
    margin-left: 280px;
  }
}

/* Mobile: no offset (sidebar is overlay) */
@media (max-width: 767px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
