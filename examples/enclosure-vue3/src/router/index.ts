import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BridgeView from '../views/BridgeView.vue'

const router = createRouter({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: '/bridge/:pathMatch(.*)*',
      name: 'bridge',
      component: BridgeView
    }
  ]
})

export default router
