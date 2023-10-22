import { createRouter, createWebHistory } from '@intlify/vue-router-bridge'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import WorksView from '../views/WorksView.vue'

const router = createRouter({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/works',
      name: 'works',
      component: WorksView,
    }
  ]
})

export default router
