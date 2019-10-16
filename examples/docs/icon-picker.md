## IconPicker 图标选择器

用于图标选择，支持自定义模式。

### 基础用法

:::demo

```html
<el-icon-picker v-model="value"></el-icon-picker>

<script>
  export default {
    data() {
      return {
        value: ""
      };
    }
  };
</script>
```

:::

### 自定义图标

扩展自定义图标库

:::demo

```html
<el-icon-picker v-model="value" :data="datas"></el-icon-picker>

<script>
  export default {
    data() {
      return {
        datas: [
          "icon-rate-face-off",
          "icon-rate-face-1",
          "icon-rate-face-2",
          "icon-rate-face-3"
        ],
        value: "icon-rate-face-1"
      };
    }
  };
</script>
```

:::

### 不同尺寸

:::demo

```html
<el-icon-picker v-model="value"></el-icon-picker>
<el-icon-picker v-model="value" size="medium"></el-icon-picker>
<el-icon-picker v-model="value" size="small"></el-icon-picker>
<el-icon-picker v-model="value" size="mini"></el-icon-picker>

<script>
  export default {
    data() {
      return {
        value: "el-icon-heatmap"
      };
    }
  };
</script>
```

:::

### Attributes

| 参数               | 说明       | 类型    | 可选值 | 默认值                |
| ------------------ | ---------- | ------- | ------ | --------------------- |
| value / v-model    | 绑定值     | string  | —      | —                     |
| disabled           | 是否禁用   | boolean | —      | false                 |
| size               | 尺寸       | string  | —      | medium / small / mini |
| data               | 自定义图标列表 | array   | —      | —                     |
| popper-class | IconPicker 下拉框的类名 | string | — | — |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean | - | true |
| page-size          | 分页大小   | number  | —      | 12                    |

### Events

| 事件名称      | 说明                               | 回调参数         |
| ------------- | ---------------------------------- | ---------------- |
| change        | 当绑定值变化时触发                 | 当前值           |
