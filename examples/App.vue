<!-- @format -->

<template>
  <div id="app">
    <el-container>
      <doc-header></doc-header>
      <div>
        <el-scrollbar wrap-class="doc-scrollbar-wrap" view-class="doc-container">
          <router-view />
          <el-backtop :right="100" :bottom="100" target=".doc-scrollbar-wrap"></el-backtop>
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

:after,
:before {
  box-sizing: border-box;
}

.doc-header {
  position: relative;
  z-index: 35;
  background-image: url('./assets/inner_bg.png');
  background-position: 0 0;
  background-repeat: repeat-x;
  background-color: rgba(#263238, 0.8) !important;
  box-shadow: 0 2px 8px rgba(#263238, 0.8);
}

.doc-scrollbar-wrap {
  height: calc(100vh - 60px) !important;
  padding-bottom: 15px;
}

.doc-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.element-doc {
  code:not([class^='language-']) {
    box-sizing: border-box;
    display: inline-block;
    padding: 0 5px;
    background: #fafcfc;
    border: 1px solid #f0f4f7;
    border-radius: 4px;
    color: #b93d6a;
    font-family: Source Code Pro, Menlo, monospace;
    font-size: 13px;
    line-height: 20px;
  }
}

@media (min-width: 768px) {
  .doc-container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .doc-container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .doc-container {
    width: 1170px;
  }
}

@media (min-width: 1920px) {
  .doc-container {
    width: 1270px;
  }
}

.doc-table {
  width: 100%;
  min-width: 719px;
  margin: 2em 0;
  font-size: 14px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  line-height: 1.5;
  border-width: 0;
  empty-cells: show;
  border: 1px solid #ebedf0;
  border-collapse: collapse;
  border-spacing: 0;
  th {
    color: #5c6b77;
    font-weight: 500;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.02);
    padding: 14px 16px;
    border: 1px solid #e8e8e8;
    border-width: 0 0 2px 0;
  }
  td {
    margin: 0;
    padding: 14px 16px;
    border-width: 1px 0;
    text-align: left;
    border: 1px solid #e8e8e8;
  }
}
</style>
