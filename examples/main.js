/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Yak from 'main/index.js'
import 'prismjs/themes/prism.css'
import 'main/style/index.scss'
import './demo-styles/index.scss'

Vue.config.productionTip = false

Vue.use(Yak)

Vue.component('DocAside', () => import('./components/doc-aside'))
Vue.component('DemoBlock', () => import('./components/demo-block'))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
