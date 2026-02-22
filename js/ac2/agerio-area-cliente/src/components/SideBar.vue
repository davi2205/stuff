<template>
  <div>
    <!-- Toggle button -->
    <button 
      class="btn btn-secondary sidebar-toggle" 
      @click="toggleSidebar"
      :class="{ 'sidebar-open': isOpen }"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay for mobile -->
    <div 
      class="sidebar-overlay" 
      :class="{ 'show': isOpen }"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'open': isOpen }">
      <nav class="nav flex-column">
        <a href="#" class="nav-link" @click="closeSidebarOnMobile">
          <i class="fas fa-home"></i>
          <span>Início</span>
        </a>
        <a href="#" class="nav-link" @click="closeSidebarOnMobile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </a>
        <a href="#" class="nav-link" @click="closeSidebarOnMobile">
          <i class="fas fa-file-alt"></i>
          <span>Documentos</span>
        </a>
        <a href="#" class="nav-link" @click="closeSidebarOnMobile">
          <i class="fas fa-sign-out-alt"></i>
          <span>Sair</span>
        </a>
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
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen
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
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: #6c757d;
  min-height: 100vh;
  width: 280px;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 20px;
  transition: transform 0.3s ease;
  z-index: 1040;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.1);
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

@media (min-width: 768px) {
  .sidebar-toggle.sidebar-open {
    left: 295px;
  }
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
