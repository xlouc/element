/** @format */

import Vue from 'vue'
import SetVal from 'yak-ui/src/utils/set-value'
import { PopupManager } from 'yak-ui/src/utils/popup'

const PopperJS = Vue.prototype.$isServer ? function() {} : require('popper.js/dist/umd/popper.js')
const stop = e => e.stopPropagation()

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: true
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    reference: {},
    popper: {},
    offset: {
      default: 0
    },
    value: Boolean,
    visibleArrow: Boolean,
    arrowOffset: {
      type: Number,
      default: 35
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          modifiers: {
            computeStyle: {
              gpuAcceleration: false
            },
            preventOverflow: {
              boundariesElement: 'viewport'
            }
          }
        }
      }
    }
  },

  data() {
    return {
      showPopper: false,
      currentPlacement: ''
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showPopper = val
        this.$emit('input', val)
      }
    },

    showPopper(val) {
      if (this.disabled) return
      val ? this.updatePopper() : this.destroyPopper()
      this.$emit('input', val)
    }
  },

  methods: {
    createPopper() {
      if (this.$isServer) return
      this.currentPlacement = this.currentPlacement || this.placement
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return
      }

      const options = this.popperOptions
      const popper = (this.popperElm = this.popperElm || this.popper || this.$refs.popper)
      let reference = (this.referenceElm = this.referenceElm || this.reference || this.$refs.reference)

      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm
      }

      if (!popper || !reference) return
      if (this.visibleArrow) {
        this.appendArrow(popper)
        if (this.arrowOffset > 0) {
          SetVal(options, 'modifiers.arrow.enabled', false)
        }
      } else {
        SetVal(options, 'modifiers.arrow.enabled', false)
      }
      if (this.appendToBody) document.body.appendChild(this.popperElm)
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy()
      }

      options.placement = this.currentPlacement

      if (typeof this.offset !== 'undefined') {
        SetVal(options, 'modifiers.offset.offset', this.offset)
      }

      options.onCreate = _ => {
        this.$emit('created', this)
        this.resetTransformOrigin()
        this.resetArrowPosition()
        this.$nextTick(this.updatePopper)
      }

      this.popperJS = new PopperJS(reference, popper, options)

      this.popperJS.popper.style.zIndex = PopupManager.nextZIndex()
      this.popperElm.addEventListener('click', stop)
    },

    updatePopper() {
      const popperJS = this.popperJS
      if (popperJS) {
        popperJS.update()
        if (popperJS.popper) {
          popperJS.popper.style.zIndex = PopupManager.nextZIndex()
        }
      } else {
        this.createPopper()
      }
    },

    doDestroy(forceDestroy) {
      /* istanbul ignore if */
      if (!this.popperJS || (this.showPopper && !forceDestroy)) return
      this.popperJS.destroy()
      this.popperJS = null
    },

    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin()
        this.resetArrowPosition()
      }
    },

    resetTransformOrigin() {
      if (!this.transformOrigin) return
      let placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }
      let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0]
      let origin = placementMap[placement]
      this.popperJS.popper.style.transformOrigin =
        typeof this.transformOrigin === 'string'
          ? this.transformOrigin
          : ['top', 'bottom'].indexOf(placement) > -1
          ? `center ${origin}`
          : `${origin} center`
    },

    resetArrowPosition() {
      if (this.visibleArrow && this.arrowOffset > 0) {
        let placement = this.popperJS.popper.getAttribute('x-placement').split('-')[0]
        let placementArrowMap = {
          top: 'left',
          bottom: 'left',
          left: 'top',
          right: 'top'
        }
        let origin = placementArrowMap[placement]
        let arrow = this.popperJS.popper.querySelector('[x-arrow]')
        arrow.style[origin] = `${this.arrowOffset}px`
      }
    },

    appendArrow(element) {
      let hash
      if (this.appended) {
        return
      }

      this.appended = true

      for (let item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name
          break
        }
      }

      const arrow = document.createElement('div')

      if (hash) {
        arrow.setAttribute(hash, '')
      }
      arrow.setAttribute('x-arrow', '')
      arrow.className = 'popper__arrow'
      element.appendChild(arrow)
    }
  },

  beforeDestroy() {
    this.doDestroy(true)
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop)
      document.body.removeChild(this.popperElm)
    }
  },

  // call destroy in keep-alive mode
  deactivated() {
    this.$options.beforeDestroy[0].call(this)
  }
}
