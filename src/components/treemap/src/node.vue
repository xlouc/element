<template>
  <div
    class="el-treemap-node"
    :class="{
      'is-root': root,
      'is-parent': !root,
      'is-child': !!hasChild,
      'is-one-child': isOnlyOneChild,
      'is-collapsed': collapsed
    }"
  >
    <a :class="['el-treemap-node__wrapper', data.class]" ref="wrapper" @click="nodeClick">
      <NodeLabel :config="config" :data="data"></NodeLabel>
      <div class="el-treemap-node__line-top" ref="topLine" v-if="!root && !onlyOneChild" />
      <div class="el-treemap-node__line-bottom" ref="bottomLine" v-if="children">
        <i
          v-if="config.foldable"
          :class="{
            'el-treemap-node__fold-icon': true,
            'el-icon-plus-square': collapsed,
            'el-icon-minus-square': !collapsed
          }"
        ></i>
      </div>
    </a>
    <div class="el-treemap-node__line" v-if="hasChild && !isOnlyOneChild" ref="centerLine" />
    <transition name="el-fade-in" @after-leave="_elTreemap.$emit('redraw-lines')" v-if="children">
      <div class="el-treemap-node__children" v-show="!collapsed" :style="{ marginTop: `${config.rowSpace}px` }">
        <treemap-node
          v-for="(item, index) in children"
          :key="GetVal(item, config.props.id, `${$attrs.index}-${index + 1}`)"
          :index="`${$attrs.index}-${index + 1}`"
          :data="item"
          :config="config"
          :style="{
            paddingLeft: index === 0 ? false : `${config.nodeSpace}px`
          }"
          :only-one-child="isOnlyOneChild"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import GetVal from 'yak-ui/src/utils/get-value.js'
import { setStyle } from 'yak-ui/src/utils/dom.js'
export default {
  name: 'TreemapNode',

  inject: ['_elTreemap'],

  props: {
    data: [String, Object],
    config: Object,
    root: Boolean,
    onlyOneChild: Boolean
  },

  data() {
    return {
      collapsed: false
    }
  },

  computed: {
    hasChild() {
      if (typeof this.data === 'string') {
        return false
      } else {
        return this.data.children && this.data.children.length
      }
    },
    isOnlyOneChild() {
      return this.hasChild === 1
    },
    children() {
      const { props } = this.config
      if (typeof this.data === 'string') {
        return false
      } else if (typeof props.children === 'function') {
        return props.children(this.data)
      }
      return GetVal(this.data, props.children)
    }
  },

  watch: {
    collapsed() {
      this._elTreemap.$emit('redraw-lines')
    }
  },

  components: {
    NodeLabel: {
      props: {
        config: Object,
        data: [String, Object]
      },
      functional: true,
      render(h, context) {
        const { data, config } = context.props
        const { props } = config
        if (typeof data === 'string') {
          return <span>{data}</span>
        } else if (typeof props.label === 'function') {
          return <span>{props.label(data)}</span>
        }
        return <span>{GetVal(data, props.label)}</span>
      }
    }
  },

  mounted() {
    this.$nextTick(this.drawLines)
    this._elTreemap.$on('redraw-lines', () => {
      this.$nextTick(this.drawLines)
    })
  },

  beforeDestroy() {
    this._elTreemap.$off('redraw-lines')
  },

  methods: {
    GetVal,
    drawLines() {
      let cableStyle = {}
      let { rowSpace } = this.config
      let rowSpaceHalf = Math.round(rowSpace / 2)
      let nodesOffsetLeft = this._elTreemap.$el.getBoundingClientRect().left
      var nodeCableStyle = {
        height: `${rowSpaceHalf}px`,
        top: `${-rowSpaceHalf - 1}px`,
        left: `${Math.round((this.$refs.wrapper.offsetWidth - 1) / 2)}px`
      }
      if (this.$refs.topLine) {
        setStyle(this.$refs.topLine, nodeCableStyle)
      }

      if (this.$refs.bottomLine) {
        nodeCableStyle.top = `${this.$refs.wrapper.offsetHeight - 1}px`
        if (this.isOnlyOneChild) {
          nodeCableStyle.height = `${rowSpace}px`
        }
        setStyle(this.$refs.bottomLine, nodeCableStyle)
        setStyle(this.$refs.bottomLine.querySelector('i'), {
          transform: `translate(-1px, ${rowSpaceHalf}px)`
        })
      }

      if (this.collapsed) {
        return
      }

      if (this.$refs.centerLine && !this.isOnlyOneChild && this.hasChild) {
        let firstChild = this.$children[0]
        let lastChild = this.$children[this.$children.length - 1]
        let lineLeft = Math.round(
          firstChild.$refs.wrapper.getBoundingClientRect().left -
            nodesOffsetLeft +
            firstChild.$refs.wrapper.offsetWidth / 2
        )
        let width =
          lastChild.$refs.wrapper.getBoundingClientRect().left -
          nodesOffsetLeft -
          lineLeft +
          lastChild.$refs.wrapper.offsetWidth / 2
        let nodeCableStyle = Object.assign(
          {
            'margin-top': `${rowSpaceHalf}px`,
            left: `${lineLeft}px`,
            width: `${width}px`
          },
          cableStyle
        )
        setStyle(this.$refs.centerLine, nodeCableStyle)
      }
    },
    nodeClick() {
      this._elTreemap.$emit('node-click', this.data, this)
      if (!this.hasChild || !this.config.foldable) return
      this.collapsed = !this.collapsed
    }
  }
}
</script>
