<script>
import ElCollapseTransition from 'yak-ui/src/transitions/collapse-transition'
import menuMixin from './menu-mixin'
import Emitter from 'yak-ui/src/mixins/emitter'
import Popper from 'yak-ui/src/utils/vue-popper'

const poperMixins = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: false
    },
    offset: Popper.props.offset,
    popperOptions: Popper.props.popperOptions
  },
  data: Popper.data,
  methods: Popper.methods,
  beforeDestroy: Popper.beforeDestroy,
  deactivated: Popper.deactivated
}

export default {
  name: 'ElSubmenu',

  componentName: 'ElSubmenu',

  mixins: [menuMixin, Emitter, poperMixins],

  components: { ElCollapseTransition },

  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    }
  },

  data() {
    return {
      popperJS: null,
      timeout: null,
      items: {},
      submenus: {},
      mouseInChild: false
    }
  },
  watch: {
    opened(val) {
      if (this.isMenuPopup) {
        this.$nextTick(_ => {
          this.updatePopper()
        })
      }
    }
  },
  computed: {
    // popper option
    appendToBody() {
      return this.popperAppendToBody === undefined ? this.isFirstLevel : this.popperAppendToBody
    },
    menuTransitionName() {
      return this.rootMenu.collapse ? 'el-zoom-in-left' : 'el-zoom-in-top'
    },
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1
    },
    active() {
      let isActive = false
      const submenus = this.submenus
      const items = this.items

      Object.keys(items).forEach(index => {
        if (items[index].active) {
          isActive = true
        }
      })

      Object.keys(submenus).forEach(index => {
        if (submenus[index].active) {
          isActive = true
        }
      })

      return isActive
    },
    colorMaps() {
      return this.rootMenu.colorMaps
    },
    mode() {
      return this.rootMenu.mode
    },
    isMenuPopup() {
      return this.rootMenu.isMenuPopup
    },
    titleStyle() {
      if (!this.colorMaps) return
      let itemStyle = {}
      if (this.active) {
        if (this.mode === 'horizontal' && this.isFirstLevel) {
          itemStyle.color = this.colorMaps.activeBackgroundColor
          itemStyle['border-bottom-color'] = this.colorMaps.activeBackgroundColor
        } else {
          itemStyle.color = this.colorMaps.activeColor
        }
      } else {
        itemStyle.color = this.colorMaps.textColor
      }
      itemStyle.backgroundColor = this.colorMaps.backgroundColor
      return itemStyle
    },
    isFirstLevel() {
      let isFirstLevel = true
      let parent = this.$parent
      while (parent && parent !== this.rootMenu) {
        if (['ElSubmenu', 'ElMenuItemGroup'].indexOf(parent.$options.componentName) > -1) {
          isFirstLevel = false
          break
        } else {
          parent = parent.$parent
        }
      }
      return isFirstLevel
    }
  },
  methods: {
    handleCollapseToggle(value) {
      if (value) {
        this.initPopper()
      } else {
        this.doDestroy()
      }
    },
    addItem(item) {
      this.$set(this.items, item.index, item)
    },
    removeItem(item) {
      delete this.items[item.index]
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item)
    },
    removeSubmenu(item) {
      delete this.submenus[item.index]
    },
    handleClick() {
      const { rootMenu, disabled } = this
      if (
        (rootMenu.menuTrigger === 'hover' && rootMenu.mode === 'horizontal') ||
        (rootMenu.collapse && rootMenu.mode === 'vertical') ||
        disabled
      ) {
        return
      }
      this.dispatch('ElMenu', 'submenu-click', this)
    },
    handleMouseenter(event, showTimeout = this.showTimeout) {
      if (!('ActiveXObject' in window) && event.type === 'focus' && !event.relatedTarget) {
        return
      }
      const { rootMenu, disabled } = this
      if (
        (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
        (!rootMenu.collapse && rootMenu.mode === 'vertical') ||
        disabled
      ) {
        return
      }
      this.dispatch('ElSubmenu', 'mouse-enter-child')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.rootMenu.openMenu(this.index, this.indexPath)
      }, showTimeout)

      if (this.appendToBody) {
        this.$parent.$el.dispatchEvent(new MouseEvent('mouseenter'))
      }
    },
    handleMouseleave(deepDispatch = false) {
      const { rootMenu } = this
      if (
        (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
        (!rootMenu.collapse && rootMenu.mode === 'vertical')
      ) {
        return
      }
      this.dispatch('ElSubmenu', 'mouse-leave-child')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        !this.mouseInChild && this.rootMenu.closeMenu(this.index)
      }, this.hideTimeout)

      if (this.appendToBody && deepDispatch) {
        if (this.$parent.$options.name === 'ElSubmenu') {
          this.$parent.handleMouseleave(true)
        }
      }
    },
    handleTitleMouseenter() {
      if (!this.colorMaps || this.active || this.disabled) return
      const title = this.$refs['submenu-title']
      if (!title) return
      if (this.mode === 'horizontal' && this.isFirstLevel) {
        title.style.color = this.colorMaps.activeBackgroundColor
        title.style['border-bottom-color'] = this.colorMaps.activeBackgroundColor
      } else {
        title.style.color = this.colorMaps.activeColor
      }
    },
    handleTitleMouseleave() {
      if (!this.colorMaps || this.active || this.disabled) return
      const title = this.$refs['submenu-title']
      if (!title) return
      if (this.mode === 'horizontal') {
        title.style.color = this.colorMaps.textColor
        title.style['border-bottom-color'] = ''
      } else {
        title.style.color = this.colorMaps.textColor
      }
    },
    updatePlacement() {
      this.currentPlacement = this.mode === 'horizontal' && this.isFirstLevel ? 'bottom-start' : 'right-start'
    },
    initPopper() {
      this.referenceElm = this.$el
      this.popperElm = this.$refs.menu
      this.updatePlacement()
    }
  },
  created() {
    this.$on('toggle-collapse', this.handleCollapseToggle)
    this.$on('mouse-enter-child', () => {
      this.mouseInChild = true
      clearTimeout(this.timeout)
    })
    this.$on('mouse-leave-child', () => {
      this.mouseInChild = false
      clearTimeout(this.timeout)
    })
  },
  mounted() {
    this.parentMenu.addSubmenu(this)
    this.rootMenu.addSubmenu(this)
    this.initPopper()
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this)
    this.rootMenu.removeSubmenu(this)
  },
  render(h) {
    const {
      active,
      opened,
      paddingStyle,
      titleStyle,
      rootMenu,
      colorMaps,
      currentPlacement,
      menuTransitionName,
      mode,
      disabled,
      popperClass,
      $slots,
      isFirstLevel
    } = this

    const popupMenu = (
      <transition name={menuTransitionName}>
        <div
          ref="menu"
          v-show={opened}
          class={[`el-menu--${mode}`, popperClass]}
          on-mouseenter={$event => this.handleMouseenter($event, 100)}
          on-mouseleave={() => this.handleMouseleave(true)}
          on-focus={$event => this.handleMouseenter($event, 100)}>
          <ul
            role="menu"
            class={['el-menu el-menu--popup', `el-menu--popup-${currentPlacement}`]}
            style={{
              backgroundColor: colorMaps ? colorMaps.backgroundColor : ''
            }}>
            {$slots.default}
          </ul>
        </div>
      </transition>
    )

    const inlineMenu = (
      <el-collapse-transition>
        <ul
          role="menu"
          class="el-menu el-menu--inline"
          v-show={opened}
          style={{
            backgroundColor: colorMaps ? colorMaps.backgroundColor : ''
          }}>
          {$slots.default}
        </ul>
      </el-collapse-transition>
    )

    const submenuTitleIcon =
      (rootMenu.mode === 'horizontal' && isFirstLevel) || (rootMenu.mode === 'vertical' && !rootMenu.collapse)
        ? 'el-icon-down'
        : 'el-icon-right'

    return (
      <li
        class={{
          'el-submenu': true,
          'is-active': active,
          'is-opened': opened,
          'is-disabled': disabled
        }}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={opened}
        on-mouseenter={this.handleMouseenter}
        on-mouseleave={() => this.handleMouseleave(false)}
        on-focus={this.handleMouseenter}>
        <div
          class="el-submenu__title"
          ref="submenu-title"
          on-click={this.handleClick}
          on-mouseenter={this.handleTitleMouseenter}
          on-mouseleave={this.handleTitleMouseleave}
          style={[paddingStyle, titleStyle]}>
          {$slots.title}
          <i class={['el-submenu__icon-arrow', submenuTitleIcon]}></i>
        </div>
        {this.isMenuPopup ? popupMenu : inlineMenu}
      </li>
    )
  }
}
</script>
