<!-- @format -->

<template>
  <el-container>
    <el-aside>
      <doc-aside base="/components"></doc-aside>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'DocComponent'
}
</script>
