/** @format */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Yak from 'main/index.js'
import icon from './icon.json'
import 'prismjs/themes/prism.css'
import 'main/style/index.scss'
import './demo-styles/index.scss'
import './assets/styles/fonts/style.css'

Vue.config.productionTip = false

Vue.use(Yak)

Vue.component('DocAside', () => import('./components/doc-aside.vue'))
Vue.component('DemoBlock', () => import('./components/demo-block'))

Vue.prototype.$icon = icon // Icon 列表页用

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
