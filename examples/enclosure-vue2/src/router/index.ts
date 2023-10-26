import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BridgeView from '../views/BridgeView.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView as any
    },
    {
      path: '/bridge/:pathMatch(.*)*',
      name: 'bridge',
      component: BridgeView
    }
  ]
})

export default router
