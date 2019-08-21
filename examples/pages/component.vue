<!-- @format -->

<template>
  <el-container class="is-absolute">
    <el-aside>
      <el-scrollbar wrap-class="doc-component-scrollbar-wrap">
        <doc-aside class="doc-aside" base="/components" :navs="navs"></doc-aside>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import navConfig from '../nav.config.json'
export default {
  name: 'DocComponent',
  computed: {
    navs() {
      return navConfig
    }
  }
}
</script>

<style lang="scss">
@import 'main/style/common/var.scss';

.el-container.is-absolute {
  min-height: 100%;
  & > .el-aside {
    position: absolute;
  }
  & > .el-main {
    margin-left: 300px;
  }
}

.doc-aside {
  min-height: 100%;
}

.doc-component-scrollbar-wrap {
  height: calc(100vh - 60px) !important;
  padding-bottom: 15px;
}

.doc-note {
  background: #f2f2f2;
  padding: 16px 20px;
  border-radius: 3px;
  border-left: 5px solid #ccc;

  &--tip {
    border-left-color: $--color-primary;
    background: rgba($--color-primary, 0.1);
  }

  &--warning {
    border-left-color: $--color-warning;
    background: rgba($--color-warning, 0.1);
  }

  &--danger {
    border-left-color: $--color-danger;
    background: rgba($--color-danger, 0.1);
  }
}
</style>
