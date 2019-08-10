<!-- @format -->

<template functional>
  <el-header class="doc-header">
    <div class="container">
      <el-row>
        <el-col :span="4">
          <a id="logo" href="#/">
            <img src="../../yak_logo.svg" />
            <img src="../assets/yak-title.svg" />
          </a>
        </el-col>
        <el-col :span="20">
          <doc-aside mode="horizontal"></doc-aside>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script>
import DocAside from './doc-aside.js'
export default {
  name: 'DocHeader',
  components: { DocAside }
}
</script>
