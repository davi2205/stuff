import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '../components/layouts/BasicLayout.vue'
import ExamplePage from '../components/page/ExamplePage.vue'
import ProfilePage from '../components/page/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'example',
      component: ExamplePage,
      meta: {
        layout: BasicLayout,
        showInMenu: true,
        menuLabel: 'Início',
        icon: 'fas fa-home'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      meta: {
        layout: BasicLayout,
        showInMenu: true,
        menuLabel: 'Perfil',
        icon: 'fas fa-user'
      }
    }
  ],
})

export default router
