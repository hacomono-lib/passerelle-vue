import VueRouter from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import WorksView from '../views/WorksView.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'about',
      component: AboutView as any,
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
