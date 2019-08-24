<!-- @format -->

<template>
  <transition name="el-drawer-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div class="el-dialog__wrapper" role="presentation" v-show="visible">
      <div class="el-drawer__container" :class="visible && 'el-drawer__open'" @click.self="handleWrapperClick" role="document" tabindex="-1">
        <div
          aria-modal="true"
          aria-labelledby="el-drawer__title"
          class="el-drawer"
          :class="[direction, customClass]"
          :style="drawerStyle"
          ref="drawer"
          role="presentation"
        >
          <header class="el-drawer__header" id="el-drawer__title">
            <slot name="title">
              <span role="heading">{{ title }}</span>
            </slot>
            <button :aria-label="`close ${title || 'drawer'}`" class="el-drawer__close-btn" type="button" v-if="showClose" @click="closeDrawer">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </header>
          <section class="el-drawer__body" v-if="rendered">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'yak-ui/src/utils/popup'
import Migrating from 'yak-ui/src/mixins/migrating'
import emitter from 'yak-ui/src/mixins/emitter'

export default {
  name: 'ElDrawer',
  mixins: [Popup, emitter, Migrating],

  inject: {
    parentDrawer: {
      default: () => null
    }
  },
  provide() {
    return {
      parentDrawer: this
    }
  },

  props: {
    appendToBody: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'rtl',
      validator(val) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1
      }
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    isHorizontal() {
      return this.direction === 'rtl' || this.direction === 'ltr'
    },
    drawerStyle() {
      const { isHorizontal, isPush, size, direction } = this
      let drawerStyle = {}
      if (isHorizontal) {
        drawerStyle['width'] = size
      } else {
        drawerStyle['height'] = size
      }
      if (isPush) {
        if (direction === 'rtl' || direction === 'ltr') {
          drawerStyle.transform = `translateX(${direction === 'ltr' ? 180 : -180}px)`
        } else {
          drawerStyle.transform = `translateY(${direction === 'ttb' ? 180 : -180}px)`
        }
      }
      return drawerStyle
    }
  },

  data() {
    return {
      closed: false,
      isPush: false
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        if (!this.closed) this.$emit('close')
      }
    }
  },

  methods: {
    push() {
      this.isPush = true
    },

    pull() {
      this.isPush = false
    },

    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        if (this.destroyOnClose === true) {
          this.rendered = false
        }
        this.closed = true
      }
    },
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer()
      }
    },
    closeDrawer() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
    }
  },

  updated() {
    this.$nextTick(() => {
      if (this.preVisible !== this.visible && this.parentDrawer) {
        if (this.visible) {
          this.parentDrawer.push()
        } else {
          this.parentDrawer.pull()
        }
      }
      this.preVisible = this.visible
    })
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
