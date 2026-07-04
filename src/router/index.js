import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HardDriveView from '../views/HardDriveView.vue'
import SoldView from '../views/SoldView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/hdd',
      name: 'hdd',
      component: HardDriveView,
    },
    {
      path: '/sold',
      name: 'sold',
      component: SoldView,
    },
  ],
})

export default router
