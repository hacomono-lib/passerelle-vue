import './assets/css/main.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'

import { insider } from '@passerelle/insider-vue'


Vue.use(VueRouter)
Vue.use(insider, { router, key: 'passerelle-playground', origin: '*' })

new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  }
})

