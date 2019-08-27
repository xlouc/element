<!-- @format -->

<template>
  <div class="el-page-header">
    <template v-if="$slots.breadcrumb">
      <slot name="breadcrumb"></slot>
    </template>
    <div class="el-page-header__back" v-else-if="backIcon">
      <div class="el-page-header__back--button">
        <i :class="backIcon"></i>
      </div>
    </div>
    <div class="el-page-header__heading"></div>
    <div class="el-page-header__content"></div>
    <div class="el-page-header__footer"></div>
    <!-- // old -->
    <div class="el-page-header__left" @click="$emit('back')">
      <i class="el-icon-arrowleft"></i>
      <div class="el-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="el-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from 'yak-ui/src/locale'
export default {
  name: 'ElPageHeader',

  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title')
      }
    },
    subTitle: {
      type: String
    },
    backIcon: {
      type: [String, Boolean],
      default: 'el-icon-arrowleft'
    },
    content: String
  }
}
</script>
