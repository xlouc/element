/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Yak from 'main/index.js'
import 'main/style/index.scss'
import './demo-styles/index.scss'

Vue.config.productionTip = false

Vue.use(Yak)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
