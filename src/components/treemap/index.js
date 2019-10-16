import Treemap from './src/main.vue'

/* istanbul ignore next */
Treemap.install = function(Vue) {
  Vue.component(Treemap.name, Treemap)
}

export default Treemap
