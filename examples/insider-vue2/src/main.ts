import './assets/css/main.css'
import 'vue-demi'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'

import { insider } from '@passerelle/insider-vue'

// vue-demi を使っているので、 Composition API は自動的にインポートされる
// Vue.use(CompositionApi)

Vue.use(VueRouter)
Vue.use(insider, { router, key: 'passerelle-playground', origin: '*' })

new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  }
})

