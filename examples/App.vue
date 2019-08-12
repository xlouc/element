<!-- @format -->

<template>
  <div id="app">
    <el-container>
      <doc-header></doc-header>
      <div>
        <el-scrollbar wrap-class="doc-scrollbar-wrap" view-class="container">
          <router-view />
        </el-scrollbar>
      </div>
    </el-container>
  </div>
</template>

<script>
import DocHeader from './components/header.vue'

export default {
  components: { DocHeader }
}
</script>

<style lang="scss">
@import 'main/style/reset.scss';
@import 'main/style/common/var.scss';

html,
body {
  padding: 0;
  margin: 0;
}

img {
  vertical-align: middle;
  border-style: none;
}

#logo {
  float: left;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  white-space: nowrap;
  text-decoration: none;

  img {
    height: 32px;
  }

  img + img {
    position: relative;
    top: 1px;
    height: 16px;
  }
}

.doc-header {
  position: relative;
  background-image: url('./assets/inner_bg.png');
  background-position: 0 0;
  background-repeat: repeat-x;
  background-color: rgba($--color-primary, 0.4) !important;
}

.doc-scrollbar-wrap {
  height: calc(100vh - 60px) !important;
}

.doc-header-section {
  background: #2b2f3e;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
</style>
