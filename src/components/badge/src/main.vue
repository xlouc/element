<template>
  <div :class="['el-badge', { 'el-badge--status': status }]">
    <template v-if="!status">
      <slot></slot>
      <transition name="el-zoom-in-center">
        <sup
          v-show="!hidden && (content || content === 0 || isDot)"
          v-text="content"
          class="el-badge__content"
          :class="[
            'el-badge__content--' + type,
            {
              'is-fixed': $slots.default,
              'is-dot': isDot
            }
          ]"
          :style="{ backgroundColor: color }"
        ></sup>
      </transition>
    </template>
    <template v-else-if="!hidden">
      <span
        :class="['el-badge__status-dot', { [`is-${type}`]: Boolean(type) }]"
        :style="{ backgroundColor: color }"
      ></span>
      <span class="el-badge__status-text">
        <slot></slot>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ElBadge',

  props: {
    value: [String, Number],
    max: Number,
    status: Boolean,
    isDot: Boolean,
    hidden: Boolean,
    color: String,
    type: {
      type: String,
      validator(val) {
        return (
          ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1
        )
      }
    }
  },

  computed: {
    content() {
      if (this.isDot || this.status) return

      const value = this.value
      const max = this.max

      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value
      }

      return value
    }
  }
}
</script>
