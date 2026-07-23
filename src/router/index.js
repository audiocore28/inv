import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MicroView from '../views/MicroView.vue'
import HardDriveView from '../views/HardDriveView.vue'
import MemoryView from '../views/MemoryView.vue'
import SolidView from '../views/SolidView.vue'
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
      path: '/pc/:brand?',
      name: 'pc',
      component: MicroView,
    },
    {
      path: '/ram',
      name: 'ram',
      component: MemoryView,
    },
    {
      path: '/ssd',
      name: 'ssd',
      component: SolidView,
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
