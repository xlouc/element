<template>
  <div class="code-block" :class="blockClass">
    <section class="code-block-demo source">
      <slot name="source"></slot>
    </section>
    <section class="code-block-meta">
      <p class="code-block-meta__describe">
        <slot></slot>
      </p>
      <span class="code-block-meta__icon">
        <el-tooltip content="在线运行" placement="top">
          <span @click="goCodepen">
            <i class="el-icon-codepen"></i>
          </span>
        </el-tooltip>
        <el-tooltip content="显示代码" placement="top">
          <span @click="showCode = !showCode">
            <img
              alt="expand code"
              src="../assets/code.svg"
              v-show="!showCode"
            />
            <img
              alt="expand code"
              src="../assets/code-open.svg"
              v-show="showCode"
            />
          </span>
        </el-tooltip>
      </span>
    </section>
    <el-collapse-transition>
      <section class="code-block-highlight" v-show="showCode">
        <slot name="highlight"></slot>
      </section>
    </el-collapse-transition>
  </div>
</template>

<script>
import Yak from 'main/index.js'
const { version } = Yak

export default {
  name: 'DemoBlock',
  props: {
    codepen: Object
  },
  data() {
    return {
      showCode: false
    }
  },
  computed: {
    blockClass() {
      return `code-${this.$router.currentRoute.path.split('/').pop()}`
    }
  },
  methods: {
    goCodepen() {
      // since 2.6.2 use code rather than jsfiddle https://blog.codepen.io/documentation/api/prefill/
      const { script, html, style } = this.codepen
      let htmlTpl =
        '<scr' +
        'ipt src="//unpkg.com/vue/dist/vue.js"></scr' +
        'ipt>' +
        '\n<scr' +
        `ipt src="//unpkg.com/yak-ui@${version}/lib/yak.umd.min.js"></scr` +
        'ipt>' +
        `\n<div id="app">\n${html.trim()}\n</div>`

      let jsTpl = (script || '').replace(/export default/, 'var Main =').trim()

      let cssTpl = `@import url("//unpkg.com/yak-ui@${version}/lib/theme-chalk/index.css");\n${(
        style || ''
      ).trim()}\n`

      jsTpl = jsTpl
        ? jsTpl + "\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount('#app')"
        : "new Vue().$mount('#app')"

      const data = {
        js: jsTpl,
        css: cssTpl,
        html: htmlTpl,
        title: this.$route.meta && this.$route.meta.title
      }
      const form =
        document.getElementById('fiddle-form') || document.createElement('form')
      while (form.firstChild) {
        form.removeChild(form.firstChild)
      }
      form.method = 'POST'
      form.action = 'https://codepen.io/pen/define/'
      form.target = '_blank'
      form.style.display = 'none'
      const input = document.createElement('input')
      input.setAttribute('name', 'data')
      input.setAttribute('type', 'hidden')
      input.setAttribute('value', JSON.stringify(data))
      form.appendChild(input)
      document.body.appendChild(form)
      form.submit()
    }
  }
}
</script>

<style lang="scss">
@import 'main/style/common/var.scss';

.code-block {
  border: 1px solid #ebedf0;
  border-radius: 2px;
  transition: all 0.2s;
  margin: 0 0 16px;

  &:hover {
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
}

.code-block-demo {
  padding: 42px 24px 50px;
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid #ebedf0;
}

.code-block-meta {
  color: #314659;
  line-height: 2;
  position: relative;
  padding: 18px 32px;
  border-radius: 0 0 2px 2px;
  transition: background-color 0.4s;
  font-size: 14px;
  p {
    padding: 0;
    margin: 0;
  }
  > p {
    font-size: 12px;
    padding-right: 25px;
    word-break: break-word;
  }
  .code-block-meta__icon {
    position: absolute;
    margin: auto;
    right: 16px;
    top: 0;
    bottom: 0;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    cursor: pointer;
    text-align: center;
    & > * {
      vertical-align: middle;
    }
    i {
      font-size: 16px;
    }
    img {
      width: 16px;
      max-width: 16px;
      margin: 0;
      box-shadow: none;
      transition: all 0.4s;
      user-select: none;
      opacity: 0.55;
      pointer-events: auto;
    }

    span + span {
      margin-left: 8px;
    }
  }
}

.code-block-actions {
  padding-top: 12px;
  text-align: center;
  border-top: 1px dashed #ebedf0;
  opacity: 0.7;
  transition: opacity 0.3s;
  .code-block-action__code {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    cursor: pointer;
  }
}

.code-block-highlight {
  border-top: 1px dashed #ebedf0;
  pre {
    margin: 0;
  }
}
</style>
