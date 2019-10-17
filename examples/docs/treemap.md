## Treemap 组织结构图

用清晰的层级结构展示信息，可展开或折叠。

### 基本用法

基础的组织结构展示。

:::demo

```html
<el-treemap :data="data"></el-treemap>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: "蔬菜",
            children: [
              {
                label: "我的菜",
                children: ["青菜", "菠菜"]
              },
              {
                label: "你的瓜",
                children: ["南瓜", "西瓜", "丝瓜", "苦瓜"]
              },
              {
                label: "甘蓝",
                children: ["大甘蓝"]
              },
              {
                label: "土豆"
              }
            ]
          }
        ]
      };
    }
  };
</script>
```

:::

### 禁止折叠子节点

关闭`foldable`，禁止折叠子节点

:::demo

```html
<el-treemap :data="data" :foldable="false"></el-treemap>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: "蔬菜",
            children: [
              {
                label: "我的菜",
                children: ["青菜", "菠菜"]
              },
              {
                label: "你的瓜",
                children: ["南瓜", "西瓜", "丝瓜", "苦瓜"]
              },
              {
                label: "甘蓝",
                children: ["大甘蓝"]
              },
              {
                label: "土豆"
              }
            ]
          }
        ]
      };
    }
  };
</script>
```

:::

### 自定义节点内容

:::demo

```html
<el-treemap :data="data" v-slot="data">
  <i v-if="data.icon" :class="data.icon" style="color: red;"></i>
  <span>{{data.label}}</span>
</el-treemap>

<script>
  export default {
    data() {
      return {
        data: [
          {
            label: "蔬菜",
            children: [
              {
                icon: "el-icon-heart-fill",
                label: "我的菜",
                children: ["青菜", "菠菜"]
              },
              {
                label: "你的瓜",
                children: ["南瓜", "西瓜", "丝瓜", "苦瓜"]
              },
              {
                label: "甘蓝",
                children: ["大甘蓝"]
              },
              {
                label: "土豆",
                class: "bg-purple"
              }
            ]
          },
          {
            label: "水果",
            children: [
              {
                label: "热性",
                class: "text-danger",
                children: ["大枣", "山楂", "樱桃", "榴莲"]
              },
              {
                label: "凉性",
                class: "text-indigo",
                children: ["山竹", "西瓜"]
              }
            ]
          }
        ]
      };
    }
  };
</script>

<style>
.bg-purple {
  background: #9C27B0 !important;
  color: #fff !important;
}

.text-danger {
  color: #E91E63;
}

.text-indigo {
  color: #3F51B5;
}
</style>
```

:::

### Attributes

| 参数      | 说明                                                 | 类型    | 可选值 | 默认值 |
| --------- | ---------------------------------------------------- | ------- | ------ | ------ |
| data      | 展示数据                                             | array   | —      | —      |
| foldable  | 是否可以折叠子节点                                   | boolean | —      | —      |
| node-key  | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | String  | —      | —      |
| props     | 配置选项，具体看下表                                 | object  | —      | —      |
| rowSpace  | 节点层级之间的间距                                   | number  | —      | 32     |
| nodeSpace | 同一层级相邻节点间的间距                             | number  | —      | 24     |

### props

| 参数     | 说明                               | 类型                   | 可选值 | 默认值 |
| -------- | ---------------------------------- | ---------------------- | ------ | ------ |
| label    | 指定节点标签为节点对象的某个属性值 | string, function(data) | —      | —      |
| children | 指定子树为节点对象的某个属性值     | string                 | —      | —      |

### Events

| 事件名称   | 说明               | 回调参数                                                                         |
| ---------- | ------------------ | -------------------------------------------------------------------------------- |
| node-click | 节点被点击时的回调 | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点组件本身。 |

### Scoped Slot

| name | 说明                            |
| ---- | ------------------------------- |
| —    | 自定义树节点的内容，参数为 data |
