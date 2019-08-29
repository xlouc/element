## PageHeader 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

### 基础

:::demo 标准页头，适合使用在需要简单描述的场景。

```html
<el-page-header @back="goBack" title="Title" sub-title="This is a subtitle">
</el-page-header>

<script>
  export default {
    methods: {
      goBack() {
        console.log("go back");
      }
    }
  };
</script>
```

:::

### 带面包屑页头

带面包屑页头，适合层级比较深的页面，让用户可以快速导航。

:::demo

```html
<el-page-header title="Title" sub-title="This is a subtitle">
  <template v-slot:breadcrumb>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </template>
</el-page-header>
```

:::

### 带内容的例子

带内容的例子,可以优先展示页面的主要信息。

:::demo

```html
<el-page-header title="Title" sub-title="This is a subtitle">
  <template v-slot:breadcrumb>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </template>
  <div class="wrap">
    <div class="content">
      <p>
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </p>
      <p class="contentLink">
        <a>
          <img :src="$assets['icon-copy']" width="24" alt="start" />
          项目复制
        </a>
        <a>
          <img :src="$assets['icon-download']" width="24" alt="info" />
          项目下载
        </a>
        <a>
          <img :src="$assets['icon-check']" width="24" alt="doc" />
          项目文档
        </a>
      </p>
    </div>
    <div class="extraContent">
      <img :src="$assets['original']" alt="content" height="120" />
    </div>
  </div>
</el-page-header>
```

:::

### 复杂的例子

使用操作区，并自定义子节点，适合使用在需要展示一些复杂的信息，帮助用户快速了解这个页面的信息和操作。

:::demo

```html
<el-page-header title="Title" sub-title="This is a subtitle">
  <template v-slot:tags>
    <el-tag color="#9C27B0" size="small">标签六</el-tag>
  </template>
  <template v-slot:extra>
    <el-button-group>
      <el-button size="small" icon="el-icon-edit"></el-button>
      <el-button size="small" type="primary" icon="el-icon-share"></el-button>
      <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
    </el-button-group>
  </template>
  <div class="wrap">
    <div class="content padding">
      <el-row>
        <el-col :span="12">
          <div class="description">
            <div class="term">活动名称</div>
            <div class="detail">团建</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="description">
            <div class="term">活动区域</div>
            <div class="detail">区域一</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="description">
            <div class="term">活动时间</div>
            <div class="detail">2018-03-09</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="description">
            <div class="term">活动性质</div>
            <div class="detail">线下主题活动</div>
          </div>
        </el-col>
        <el-col>
          <div class="description">
            <div class="term">活动形式</div>
            <div class="detail">
              其内容丰富多彩，涉及到社会方方面面。从区域划分，有农村的、有城市的、有内地、有沿海的；
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <img :src="$assets['original']" alt="content" height="120" />
  </div>
  <template v-slot:footer>
    <el-tabs>
      <el-tab-pane label="明细"></el-tab-pane>
      <el-tab-pane label="规则"></el-tab-pane>
    </el-tabs>
  </template>
</el-page-header>
```

:::

### Attributes

| 参数     | 说明                                               | 类型             | 可选值 | 默认值              |
| -------- | -------------------------------------------------- | ---------------- | ------ | ------------------- |
| title    | 自定义标题文字                                     | string           | —      | 返回                |
| subTitle | 自定义的二级标题文字                               | string           | —      | —                   |
| backIcon | 自定义 back icon ，如果为 `false` 不渲染 back icon | string / boolean | —      | `el-icon-arrowleft` |

### Events

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| back     | 返回按钮的点击事件 | —        |

### Slots

| Name       | 说明                                   |
| ---------- | -------------------------------------- |
| title      | 自定义标题文字                         |
| subTitle   | 自定义的二级标题文字                   |
| tags       | title 旁的 tag 列表                    |
| extra      | 操作区，位于 title 行的行尾            |
| breadcrumb | 面包屑的配置                           |
| footer     | PageHeader 的页脚，一般用于渲染 TabBar |
