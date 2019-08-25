<!-- @format -->

<template>
  <li class="el-timeline-item">
    <div class="el-timeline-item__tail"></div>

    <div v-if="!$slots.dot" class="el-timeline-item__node" :class="dotClass" :style="dotStyle">
      <i v-if="icon" class="el-timeline-item__icon" :class="icon"></i>
    </div>

    <div v-if="$slots.dot" class="el-timeline-item__dot" ref="dot" :style="{ left: `-${dotLeft}px` }">
      <slot name="dot"></slot>
    </div>

    <div class="el-timeline-item__wrapper">
      <div v-if="!hideTimestamp && placement === 'top'" class="el-timeline-item__timestamp is-top">
        {{ timestamp }}
      </div>

      <div class="el-timeline-item__content">
        <slot></slot>
      </div>

      <div v-if="!hideTimestamp && placement === 'bottom'" class="el-timeline-item__timestamp is-bottom">
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ElTimelineItem',

  inject: ['timeline'],

  props: {
    timestamp: String,

    placement: {
      type: String,
      default: 'bottom'
    },

    type: String,

    color: String,

    size: {
      type: [String, Number],
      default: 'normal'
    },

    icon: String
  },

  data() {
    return {
      dotLeft: 0
    }
  },

  computed: {
    hideTimestamp() {
      return !this.timestamp
    },
    dotClass() {
      return {
        [`el-timeline-item__node--${this.size}`]: ['normal', 'large'].indexOf(this.size) >= 0,
        [`el-timeline-item__node--${this.type}`]: Boolean(this.type)
      }
    },
    dotStyle() {
      let dotStyle = { backgroundColor: this.color }
      if (typeof this.size === 'number') {
        dotStyle.width = dotStyle.height = `${this.size}px`
        dotStyle.left = `-${this.size / 2 - 5}px`
      }
      return dotStyle
    }
  },

  updated() {
    if (!this.$slots.dot || !this.$refs.dot) return
    let left = this.$refs.dot.offsetWidth / 2 - 5
    if (this.dotLeft === left) return
    // 如果放在updated中会造成死循环
    this.dotLeft = left
  }
}
</script>
