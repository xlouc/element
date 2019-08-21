<!-- @format -->

<template>
  <el-container>
    <el-aside style="min-height: 100%;">
      <doc-aside base="/guide" :navs="navs"></doc-aside>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  computed: {
    navs() {
      return [
        {
          children: [
            {
              path: '/about',
              name: '关于Yak'
            },
            {
              path: '/design',
              name: '设计原则'
            },
            {
              path: '/nav',
              name: '导航'
            }
          ]
        }
      ]
    }
  }
}
</script>
