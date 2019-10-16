<template>
  <section class="element-doc doc-changelog">
    <h1>更新日志</h1>
    <p>
      <code>yak-ui</code>
      严格遵循
      <el-link
        type="primary"
        href="https://semver.org/lang/zh-CN/"
        target="_blank"
        >Semantic Versioning 2.0.0</el-link
      >
      语义化版本规范。
    </p>
    <h4>发布周期</h4>
    <ul>
      <li>
        <p>
          修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的
          bugfix，则任何时候都可发布）
        </p>
      </li>
      <li>
        <p>次版本号：每月发布一个带有新特性的向下兼容的版本。</p>
      </li>
      <li>
        <p>主版本号：含有破坏性更新和新特性，不在发布周期内。</p>
      </li>
    </ul>
    <el-timeline pending>
      <el-timeline-item
        v-for="item in timelines"
        :key="item.version"
        :timestamp="item.date"
        placement="top"
      >
        <el-card>
          <template v-slot:header>
            <el-link
              :href="
                `https://github.com/yakcodo/yak/releases/tag/v${item.version}`
              "
              type="primary"
              target="_blank"
            >
              <h2 style="color: inherit;">{{ item.version }}</h2>
            </el-link>
          </template>
          <div v-html="item.content"></div>
        </el-card>
      </el-timeline-item>
      <el-timeline-item>
        <el-link
          type="primary"
          href="https://github.com/ElemeFE/element/releases/tag/v2.11.1"
          target="_blank"
          >Fork: Element v2.11.1</el-link
        >
      </el-timeline-item>
      <el-timeline-item
        ><el-link type="primary">查看更多</el-link></el-timeline-item
      >
    </el-timeline>
    <CHANGELOG ref="changeLog" v-show="false"></CHANGELOG>
  </section>
</template>

<script>
import CHANGELOG from 'yak-ui/CHANGELOG.md'

// 匹配日期（年-月-日）
const dateRegx = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/g
const versionRegx = /\d+\.\d+\.\d/

export default {
  components: { CHANGELOG },
  data() {
    return {
      timelines: []
    }
  },
  mounted() {
    // 解析日志
    this.$nextTick(function() {
      const changeLog = this.$refs.changeLog
      const changeLogNodes = changeLog.$el.children
      this.timelines = []
      let item = null
      for (let i = 0; i < changeLogNodes.length; i++) {
        let node = changeLogNodes[i]

        if (node.tagName === 'H2' || node.textContent.match(versionRegx)) {
          let textContent = node.textContent
          item = {
            date: textContent.match(dateRegx)[0],
            version: textContent.match(versionRegx)[0],
            content: ''
          }
          this.timelines.push(item)
        } else {
          item.content += node.outerHTML
        }
      }
      console.log('changeLogNodes', this.timelines)
    })
  }
}
</script>

<style lang="scss">
.doc-changelog {
  .el-card__body {
    h3 {
      margin: 0;
      padding-top: 15px;
      &:first-child {
        padding: 0;
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin: 0 0 0 20px;
        padding: 0 0 0 4px;
        list-style-type: circle;
      }
    }
  }
}
</style>
