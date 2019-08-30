## Empty 空状态

空状态时的展示占位图。

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

### 基本

简单的展示。

:::demo

```html
<el-empty></el-empty>
```

:::

### 自定义

自定义图片链接、图片大小、描述、附属内容。

:::demo

```html
<el-empty :image="$assets['plant-1']" imageStyle="height: 60px;">
  <template v-slot:description>
    <span> Customize <a href="#API">Description</a> </span>
  </template>
  <el-button type="primary" size="small">Create Now</el-button>
</el-empty>
```

:::

### Attributes

| 参数        | 说明                                           | 类型            | 可选值 | 默认值 |
| ----------- | ---------------------------------------------- | --------------- | ------ | ------ |
| description | 自定义描述内容                                 | string          | —      | —      |
| imageStyle  | 图片样式                                       | string / object | —      | —      |
| image       | 设置显示图片，为 string 时表示自定义图片地址。 | string          | —      | —      |

### Slots

| Name        | 说明           |
| ----------- | -------------- |
| —           | 附属内容       |
| description | 自定义描述内容 |
