<template>
  <div
    :class="[
      'el-iconpicker',
      {
        [`el-iconpicker--${iconSize}`]: Boolean(iconSize),
        'is-focus': visible
      }
    ]"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div class="el-iconpicker__input" ref="reference">
      <div class="el-iconpicker__icon">
        <i :class="value"></i>
      </div>
      <i class="el-iconpicker__caret el-icon-up"></i>
    </div>
    <transition
      name="el-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy"
    >
      <dropdown
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible"
      >
        <div class="el-iconpicker-search">
          <el-input
            v-model="searchVal"
            size="small"
            suffix-icon="el-icon-search"
          ></el-input>
        </div>
        <div class="el-iconpicker-list">
          <div
            v-for="icon in iconDatas"
            :key="icon"
            class="el-iconpicker-list__item"
            :class="{ 'is-active': value === icon }"
            @click="selectIcon(icon)"
          >
            <i :class="icon"></i>
          </div>
          <el-empty v-if="!iconDatas || iconDatas.length <= 0"></el-empty>
        </div>
        <div class="el-iconpicker-page">
          <div class="el-iconpicker-page__count">
            {{ currentPage }}/{{ iconPageSize }}({{ iconDataSize }})
          </div>
          <div class="el-iconpicker-page__operate">
            <i
              class="el-icon-left"
              v-if="currentPage > 1"
              @click="currentPage = currentPage - 1"
            ></i>
            <i
              class="el-icon-right"
              v-if="currentPage < iconPageSize"
              @click="currentPage = currentPage + 1"
            ></i>
          </div>
        </div>
      </dropdown>
    </transition>
  </div>
</template>

<script>
import icons from 'yak-ui/icon.json'
import Emitter from 'yak-ui/src/mixins/emitter'
import Clickoutside from 'yak-ui/src/utils/clickoutside'
import ElInput from 'yak-ui/components/input'
import ElEmpty from 'yak-ui/components/empty'
import Dropdown from './dropdown.vue'

const iconList = icons.map(item => `el-icon-${item}`)

export default {
  mixins: [Emitter],

  name: 'ElIconPicker',

  componentName: 'ElIconPicker',

  components: { Dropdown, ElInput, ElEmpty },

  directives: { Clickoutside },

  props: {
    value: String,
    disabled: Boolean,
    size: String,
    popperClass: String,
    data: Array,
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 12
    }
  },

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data() {
    return {
      currentPage: 1,
      searchVal: '',
      visible: false
    }
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    },

    iconSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },

    iconArray() {
      let iconArray = [].concat(iconList, this.data || [])
      if (this.searchVal && this.searchVal !== null && this.searchVal !== '') {
        iconArray = iconArray.filter(
          val => val.toLowerCase().indexOf(this.searchVal.toLowerCase()) >= 0
        )
      }
      return iconArray
    },

    iconDatas() {
      let iconDatas = this.iconArray
      iconDatas = iconDatas.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
      return iconDatas
    },

    iconDataSize() {
      return this.iconArray.length
    },

    iconPageSize() {
      return Math.ceil(this.iconDataSize / this.pageSize)
    }
  },

  watch: {
    visible(val) {
      this.searchVal = ''
      if (!val) {
        this.broadcast('ElIconPickerDropdown', 'destroyPopper')
      } else {
        this.broadcast('ElIconPickerDropdown', 'updatePopper')
      }
    },
    searchVal() {
      this.$nextTick(this.handleMenuEnter)
    }
  },

  methods: {
    toggleMenu() {
      if (this.selectDisabled) {
        this.visible = false
        return
      }
      this.visible = !this.visible
    },

    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy()
    },

    handleMenuEnter() {
      if (this.value) {
        let index = this.iconArray.indexOf(this.value)
        if (index > 0) {
          this.currentPage = Math.ceil(index / this.pageSize)
        } else {
          this.currentPage = 1
        }
      }
    },
    selectIcon(icon) {
      this.$emit('input', icon)
      this.visible = false
      this.$emit('change', icon)
      this.dispatch('ElFormItem', 'el.form.change', [icon])
    },

    handleClose() {
      this.visible = false
    }
  }
}
</script>
