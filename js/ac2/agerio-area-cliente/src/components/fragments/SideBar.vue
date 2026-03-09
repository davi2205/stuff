<template>
  <div>
    <!-- Toggle button -->
    <button class="btn btn-secondary sidebar-toggle" @click="toggleSidebar" :class="{ 'sidebar-open': isOpen }">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay for mobile -->
    <div class="sidebar-overlay" :class="{ 'show': isOpen }" @click="closeSidebar"></div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'open': isOpen }">
      <div class="sidebar-header">
        <img src="https://via.placeholder.com/200x80/ffffff/1e7ba6?text=AgeRio" alt="AgeRio Logo" class="logo">
      </div>
      <nav class="nav flex-column">
        <router-link v-for="route in menuRoutes" :key="route.name" :to="route.path" class="nav-link"
          :class="{ active: isActiveRoute(route) }" @click="closeSidebarOnMobile">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.menuLabel }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      isOpen: false,
      isMobile: false
    }
  },
  computed: {
    menuRoutes() {
      // Filter routes that should be shown in the menu
      return this.$router.options.routes.filter(route => route.meta?.showInMenu);
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768
      if (!this.isMobile) {
        this.isOpen = true // Keep open on desktop
      } else {
        this.isOpen = false // Close on mobile
      }
      this.$emit('sidebar-state-changed', this.isOpen)
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen
      this.$emit('sidebar-state-changed', this.isOpen)
    },
    closeSidebar() {
      if (this.isMobile) {
        this.isOpen = false
      }
    },
    closeSidebarOnMobile() {
      if (this.isMobile) {
        this.isOpen = false
      }
    },
    isActiveRoute(route) {
      // Check if the current route matches this menu item
      return this.$route.name === route.name || this.$route.path === route.path;
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #6c757d;
  height: 100vh;
  width: 280px;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease;
  z-index: 1040;
  overflow-y: auto;
}

.sidebar-header {
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo {
  max-width: 100%;
  height: auto;
}

/* Desktop: sidebar visible by default */
@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
  }

  .sidebar:not(.open) {
    transform: translateX(-280px);
  }
}

/* Mobile: sidebar hidden by default */
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-280px);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

.nav-link {
  color: #ffffff;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
}

.nav-link i {
  font-size: 20px;
  width: 30px;
  margin-right: 15px;
}

.nav-link span {
  font-size: 16px;
  font-weight: 400;
}

/* Toggle button */
.sidebar-toggle {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1050;
  transition: left 0.3s ease;
}

.sidebar-toggle.sidebar-open {
  left: 295px;
}

/* Overlay for mobile */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1030;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sidebar-overlay.show {
  opacity: 1;
  visibility: visible;
}

@media (min-width: 768px) {
  .sidebar-overlay {
    display: none;
  }
}
</style>
