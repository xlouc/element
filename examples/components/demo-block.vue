<!-- @format -->

<template>
  <div class="code-block" :class="blockClass">
    <section class="code-block-demo">
      <slot name="source"></slot>
    </section>
    <section class="code-block-meta">
      <p class="code-block-meta__describe">
        <slot></slot>
      </p>
      <el-tooltip content="显示代码" placement="top">
        <span class="code-block-meta__icon" @click="showCode = !showCode">
          <img alt="expand code" src="../assets/code.svg" v-show="!showCode" />
          <img alt="expand code" src="../assets/code-open.svg" v-show="showCode" />
        </span>
      </el-tooltip>
    </section>
    <el-collapse-transition>
      <section class="code-block-highlight" v-show="showCode">
        <slot name="highlight"></slot>
      </section>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',
  data() {
    return {
      showCode: false
    }
  },
  computed: {
    blockClass() {
      return `code-${this.$router.currentRoute.path.split('/').pop()}`
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
    width: 16px;
    height: 16px;
    line-height: 16px;
    cursor: pointer;
    text-align: center;
    img {
      width: 100%;
      max-width: 100%;
      margin: 0;
      box-shadow: none;
      transition: all 0.4s;
      user-select: none;
      opacity: 0.55;
      pointer-events: auto;
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
