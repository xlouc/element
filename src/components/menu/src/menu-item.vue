<template>
  <li
    class="el-menu-item"
    role="menuitem"
    tabindex="-1"
    :style="[paddingStyle, itemStyle]"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <el-tooltip
      v-if="
        parentMenu.$options.componentName === 'ElMenu' &&
          rootMenu.collapse &&
          $slots.title
      "
      effect="dark"
      placement="right"
    >
      <div slot="content"><slot name="title"></slot></div>
      <div
        style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;"
      >
        <slot></slot>
      </div>
    </el-tooltip>
    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>

<script>
import Menu from './menu-mixin'
import ElTooltip from 'yak-ui/components/tooltip'
import Emitter from 'yak-ui/src/mixins/emitter'

export default {
  name: 'ElMenuItem',

  componentName: 'ElMenuItem',

  mixins: [Menu, Emitter],

  components: { ElTooltip },

  props: {
    index: {
      default: null,
      validator: val => typeof val === 'string' || val === null
    },
    route: [String, Object],
    disabled: Boolean
  },

  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex
    },

    colorMaps() {
      return this.rootMenu.colorMaps
    },

    mode() {
      return this.rootMenu.mode
    },

    itemStyle() {
      if (!this.colorMaps) return
      let itemStyle = {}
      if (this.active) {
        if (this.mode === 'horizontal' && !this.isNested) {
          itemStyle.color = this.colorMaps.activeBackgroundColor
          itemStyle[
            'border-bottom-color'
          ] = this.colorMaps.activeBackgroundColor
        } else {
          itemStyle.color = this.colorMaps.activeColor
          itemStyle.backgroundColor = this.colorMaps.activeBackgroundColor
        }
      } else {
        itemStyle.color = this.colorMaps.textColor
        itemStyle.backgroundColor = this.colorMaps.backgroundColor
      }
      return itemStyle
    },
    isNested() {
      return this.parentMenu !== this.rootMenu
    }
  },

  methods: {
    onMouseEnter() {
      if (!this.colorMaps || this.active || this.disabled) return
      if (this.mode === 'horizontal' && !this.isNested) {
        this.$el.style.color = this.colorMaps.activeBackgroundColor
        this.$el.style[
          'border-bottom-color'
        ] = this.colorMaps.activeBackgroundColor
      } else {
        this.$el.style.color = this.colorMaps.activeColor
      }
    },

    onMouseLeave() {
      if (!this.colorMaps || this.active || this.disabled) return
      if (this.mode === 'horizontal' && !this.isNested) {
        this.$el.style.color = this.colorMaps.textColor
        this.$el.style['border-bottom-color'] = ''
      } else {
        this.$el.style.color = this.colorMaps.textColor
      }
    },

    handleClick() {
      if (!this.disabled) {
        this.dispatch('ElMenu', 'item-click', this)
        this.$emit('click', this)
      }
    }
  },

  mounted() {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },

  beforeDestroy() {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  }
}
</script>
