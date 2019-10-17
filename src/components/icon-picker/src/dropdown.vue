<template>
  <div class="el-iconpicker-dropdown el-popper" :class="popperClass">
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'yak-ui/src/utils/vue-popper'
export default {
  name: 'ElIconPickerDropdown',

  componentName: 'ElIconPickerDropdown',

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom-start'
    },

    popperOptions: Popper.props.popperOptions,

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    popperClass() {
      return this.$parent.popperClass
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.reference
    this.$parent.popperElm = this.popperElm = this.$el
    this.$on('updatePopper', () => {
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>
