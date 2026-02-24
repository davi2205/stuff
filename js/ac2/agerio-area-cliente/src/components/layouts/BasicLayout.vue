<template>
  <div class="basic-layout">
    <SideBar @sidebar-state-changed="handleSidebarStateChange" />
    <div :class="['content', { 'sidebar-open': isSidebarOpen }]">
      <slot />
    </div>
  </div>
</template>

<script>
import SideBar from '../fragments/SideBar.vue';

export default {
  name: 'BasicLayout',
  components: {
    SideBar
  },
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    handleSidebarStateChange(isOpen) {
      this.isSidebarOpen = isOpen;
    }
  }
};
</script>

<style scoped>
.basic-layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.content.sidebar-open {
  margin-left: 280px;
  /* Width of the sidebar */
}

@media (max-width: 768px) {
  .content.sidebar-open {
    margin-left: 0;
    /* No margin on mobile */
  }
}
</style>