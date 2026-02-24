<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return layout || 'div';
    }
  }
};
</script>

<style scoped></style>
