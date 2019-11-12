<template functional>
  <el-header class="doc-header">
    <div class="doc-container">
      <el-row>
        <el-col :span="4">
          <a id="logo" href="#/">
            <img src="../../yak_logo.svg" />
            <img src="../assets/yak-title.svg" />
          </a>
        </el-col>
        <el-col :span="20">
          <div class="doc-header-nav">
            <!-- <div class="doc-header-nav--left">
              <ul class="doc-nav">
                <li class="doc-nav-item">
                  <router-link to="/components">组件</router-link>
                </li>
              </ul>
            </div> -->
            <div class="doc-header-nav--right">
              <ul class="doc-nav">
                <li class="doc-nav-item">
                  <router-link to="/guide">指 南</router-link>
                </li>
                <li class="doc-nav-item">
                  <router-link to="/components">组 件</router-link>
                </li>
                <li class="doc-nav-item">
                  <router-link to="/resource">资 源</router-link>
                </li>
                <li class="doc-nav-item">
                  <a href="https://github.com/yakcodo/yak" target="_blank">Github</a>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'DocHeader'
}
</script>

<style lang="scss">
@import 'main/style/common/var.scss';

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

.doc-header-nav {
  align-items: center;
  display: block;
  justify-content: space-between;
  width: 100%;

  &--left {
    align-items: center;
    display: flex;
    float: left;
  }

  &--right {
    align-items: center;
    display: flex;
    float: right;
  }
}

.doc-nav {
  list-style: none;
  padding: 0;
  margin: 0;

  &-item {
    float: left;
    list-style: none;
    margin: 0 5px;
  }

  a {
    color: #fff;
    display: block;
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    position: relative;

    &:hover,
    &:focus,
    &:active {
      color: #fff;
      text-decoration: none;
    }
  }

  .router-link-active {
    &:after {
      background: $--color-primary;
      bottom: -1px;
      content: '';
      height: 3px;
      left: 0;
      position: absolute;
      right: 0;
      z-index: 30;
    }
  }
}
</style>
