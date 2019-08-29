/** @format */

import Descriptions from './src/main'

/* istanbul ignore next */
Descriptions.install = function install(Vue) {
  Vue.component(Descriptions.name, Descriptions)
}

export default Descriptions
