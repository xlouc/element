## Result 结果

用于反馈一系列操作任务的处理结果。

- 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

### Success

成功的结果。

:::demo

```html
<el-result
  status="success"
  title="提交成功"
  subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
>
  <template v-slot:extra>
    <el-button type="primary">返回列表</el-button>
    <el-button>打 印</el-button>
  </template>
</el-result>
```

:::

### Info

展示处理结果。

:::demo

```html
<el-result status="info" title="提交处理中">
  <template v-slot:extra>
    <el-button type="primary">返回列表</el-button>
  </template>
</el-result>
```

:::

### Warning

警告类型的结果。

:::demo

```html
<el-result status="warning" title="你的提交有些问题">
  <template v-slot:extra>
    <el-button type="primary">返回列表</el-button>
  </template>
</el-result>
```

:::

### Error

错误类型的结果。

:::demo

```html
<el-result
  status="error"
  title="提交失败"
  subTitle="请核对并修改信息后，再重新提交。"
>
  <template v-slot:extra>
    <el-button type="primary">返回修改</el-button>
  </template>
</el-result>
```

:::

### 403

你没有此页面的访问权限。

:::demo

```html
<el-result
  status="403"
  title="403"
  subTitle="Sorry, you are not authorized to access this page."
>
  <template v-slot:extra>
    <el-button type="primary">返回首页</el-button>
  </template>
</el-result>
```

:::

### 404

此页面未找到。

:::demo

```html
<el-result
  status="404"
  title="404"
  subTitle="Sorry, the page you visited does not exist."
>
  <template v-slot:extra>
    <el-button type="primary">返回首页</el-button>
  </template>
</el-result>
```

:::

### 500

服务器发生了错误。

:::demo

```html
<el-result status="500" title="500" subTitle="Sorry, the server is wrong.">
  <template v-slot:extra>
    <el-button type="primary">返回首页</el-button>
  </template>
</el-result>
```

:::

### Attributes

| 参数     | 说明                      | 类型   | 可选值                                             | 默认值 |
| -------- | ------------------------- | ------ | -------------------------------------------------- | ------ |
| title    | title 文字                | string | —                                                  | —      |
| subTitle | subTitle 文字             | string | —                                                  | —      |
| status   | 结果的状态,决定图标和颜色 | string | success / error / info / warning / 404 / 403 / 500 | info   |
| icon     | 自定义 icon               | string | —                                                  | —      |

### Slot

| name     | 说明          |
| -------- | ------------- |
| —        | 内容          |
| title    | title 文字    |
| subTitle | subTitle 文字 |
| icon     | 自定义 icon   |
| extra    | 操作区        |
