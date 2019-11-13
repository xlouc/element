<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="el-autocomplete-suggestion el-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <el-scrollbar
        tag="ul"
        wrap-class="el-autocomplete-suggestion__wrap"
        view-class="el-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading">
          <i class="el-icon-loading anticon">
            <svg viewBox="0 0 32 32" width="1em" height="1em" fill="currentColor">
              <title>spinner</title>
              <path
                d="M13 29c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM0 16c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM26 16c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM3.808 6.808c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM22.192 25.192c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM3.808 25.192c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM22.192 6.808c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3z"
              ></path>
            </svg>
          </i>
        </li>
        <slot v-else></slot>
      </el-scrollbar>
    </div>
  </transition>
</template>
<script>
import Popper from 'yak-ui/src/utils/vue-popper'
import Emitter from 'yak-ui/src/mixins/emitter'
import ElScrollbar from 'yak-ui/components/scrollbar'

export default {
  components: { ElScrollbar },
  mixins: [Popper, Emitter],

  componentName: 'ElAutocompleteSuggestions',

  data() {
    return {
      parent: this.$parent,
      dropdownWidth: ''
    }
  },

  props: {
    options: {
      default() {
        return {
          gpuAcceleration: false
        }
      }
    },
    id: String
  },

  methods: {
    select(item) {
      this.dispatch('ElAutocomplete', 'item-click', item)
    }
  },

  updated() {
    this.$nextTick(_ => {
      this.popperJS && this.updatePopper()
    })
  },

  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el
    this.referenceElm = this.$parent.$refs.input.$refs.input
    this.referenceList = this.$el.querySelector('.el-autocomplete-suggestion__list')
    this.referenceList.setAttribute('role', 'listbox')
    this.referenceList.setAttribute('id', this.id)
  },

  created() {
    this.$on('visible', (val, inputWidth) => {
      this.dropdownWidth = inputWidth + 'px'
      this.showPopper = val
    })
  }
}
</script>
