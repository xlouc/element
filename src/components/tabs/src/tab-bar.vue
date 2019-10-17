<template>
  <div
    class="el-tabs__active-bar"
    :class="`is-${rootTabs.tabPosition}`"
    :style="barStyle"
  ></div>
</template>
<script>
import { arrayFind } from 'yak-ui/src/utils/util'

const firstUpperCase = str => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

export default {
  name: 'TabBar',

  props: {
    tabs: Array
  },

  inject: ['rootTabs'],

  computed: {
    barStyle: {
      get() {
        let style = {}
        let offset = 0
        let tabSize = 0
        const sizeName =
          ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1
            ? 'width'
            : 'height'
        const sizeDir = sizeName === 'width' ? 'x' : 'y'

        this.tabs.every((tab, index) => {
          let $el = arrayFind(
            this.$parent.$refs.tabs || [],
            t => t.id.replace('tab-', '') === tab.paneName
          )
          if (!$el) {
            return false
          }
          // 优化
          if (tab.active) {
            if (sizeName === 'width') {
              offset = $el.offsetLeft
              tabSize = $el.offsetWidth
            } else {
              offset = $el.offsetTop
              tabSize = $el.offsetHeight
            }
            return false
          }
          return true
        })

        const transform = `translate${firstUpperCase(sizeDir)}(${offset}px)`
        style[sizeName] = tabSize + 'px'
        style.transform = transform
        style.msTransform = transform
        style.webkitTransform = transform

        return style
      }
    }
  }
}
</script>
