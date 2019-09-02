## List 列表

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

### 基本用法

List 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

::: demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<el-radio-group v-model="size">
  <el-radio label="">默认</el-radio>
  <el-radio label="medium">中等</el-radio>
  <el-radio label="small">小型</el-radio>
  <el-radio label="mini">超小</el-radio>
</el-radio-group>
<br />
<br />
<el-list :size="size" header="列表尺寸" bordered footer="Footer">
  <el-list-item v-for="(item, index) in listData" :key="index">
    {{ item }}
  </el-list-item>
</el-list>

<script>
  const listData = [
    "《新凉》 水满田畴稻叶齐，日光穿树晓烟低。黄莺也爱新凉好，飞过青山影里啼。",
    "《山中》 荆溪白石出，天寒红叶稀。山路元无雨，空翠湿人衣。",
    "《辛夷坞》 木末芙蓉花，山中发红萼。涧户寂无人，纷纷开且落。",
    "《秋夜喜遇王处士》 北场芸藿罢，东皋刈黍归。相逢秋月满，更值夜萤飞。",
    "《稻田》 绿波春浪满前陂，极目连云罢亚肥。更被鹭鹚千点雪，破烟来入画屏飞。"
  ];
  export default {
    data() {
      return {
        size: "",
        listData: listData
      };
    }
  };
</script>
```

:::

### 竖排列表样式

通过设置 `layout` 属性为 `vertical` 可实现竖排列表样式。

::: demo

```html
<el-list layout="vertical">
  <el-list-item
    v-for="(item, index) in listData"
    :key="index"
    :avatar="item.avatar"
    :title="item.title"
    :description="item.description"
  >
    {{ item.content }}
    <template v-slot:extra>
      <img width="272" alt="logo" :src="$assets.hamburger" />
    </template>
    <template v-slot:actions>
      <el-link icon="el-icon-star">156</el-link>
      <el-link icon="el-icon-like">156</el-link>
      <el-link icon="el-icon-message">2</el-link>
    </template>
  </el-list-item>
</el-list>

<script>
  export default {
    data() {
      let listData = [];
      for (let i = 0; i < 3; i++) {
        listData.push({
          title: `《归园田居》 [魏晋] 陶渊明`,
          avatar: this.$assets["avatar"],
          description:
            "少无适俗韵，性本爱丘山。误落尘网中，一去三十年。羁鸟恋旧林，池鱼思故渊。开荒南野...",
          content:
            "少无适俗韵，性本爱丘山。误落尘网中，一去三十年。羁鸟恋旧林，池鱼思故渊。开荒南野际，守拙归园田。方宅十余亩，草屋八九间。榆柳荫后檐，桃李罗堂前。暧暧远人村，依依墟里烟。狗吠深巷中，鸡鸣桑树颠。户庭无尘杂，虚室有余闲。久在樊笼里，复得返自然。"
        });
      }
      return {
        listData: listData
      };
    }
  };
</script>
```

:::

### 栅格列表

可以通过设置 `List` 的 `grid` 属性来实现栅格列表，`column` 可设置期望显示的列数。

::: demo 响应式的栅格列表。尺寸与 [Layout Grid](#/components/layout) 保持一致。

```html
<el-list :grid="{ gutter: 16, column: 4 }">
  <el-list-item v-for="(item, index) in listData" :key="index">
    <el-card style="width: 100%">
      <div slot="header">
        <span>{{item}}</span>
      </div>
      Card content
    </el-card>
  </el-list-item>
</el-list>

<script>
  const listData = ["Title 1", "Title 2", "Title 3", "Title 4"];
  export default {
    data() {
      return {
        listData: listData
      };
    }
  };
</script>
```

:::

### List Attribute

| 参数     | 说明                                                             | 类型    | 可选值                | 默认值     |
| -------- | ---------------------------------------------------------------- | ------- | --------------------- | ---------- |
| bordered | 是否展示边框                                                     | boolean | —                     | false      |
| grid     | 列表栅格配置                                                     | object  | —                     | —          |
| layout   | 设置 `ListItem` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string  | horizontal / vertical | horizontal |
| size     | `list` 的尺寸                                                    | string  | medium / small / mini | —          |
| split    | 是否展示分割线                                                   | boolean | —                     | true       |
| header   | 列表头部                                                         | string  | —                     | true       |
| footer   | 列表底部                                                         | string  | —                     | true       |

### List Slot

| name   | 说明     |
| ------ | -------- |
| header | 列表头部 |
| footer | 列表底部 |

### List grid props

| 参数   | 说明                                        | 类型   | 默认值 |
| ------ | ------------------------------------------- | ------ | ------ |
| column | 列数(可选：1 / 2 / 3 / 4 / 6 / 8 / 12 / 24) | number | -      |
| gutter | 栅格间隔                                    | number | 0      |
| xs     | `<768px` 展示的列数                         | number | -      |
| sm     | `≥768px` 展示的列数                         | number | -      |
| md     | `≥992px` 展示的列数                         | number | -      |
| lg     | `≥1200px` 展示的列数                        | number | -      |
| xl     | `≥1920px` 展示的列数                        | number | -      |

### ListItem Attribute

| 参数        | 说明                                                                                                | 类型   | 可选值 | 默认值 |
| ----------- | --------------------------------------------------------------------------------------------------- | ------ | ------ | ------ |
| avatar      | 列表元素的图标                                                                                      | string | —      | —      |
| title       | 列表元素的标题                                                                                      | string | —      | —      |
| description | 列表元素的描述内容                                                                                  | string | —      | —      |
| extra       | 额外内容, 通常用在 `layout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | string | —      | —      |

### ListItem Slot

| name        | 说明                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------- |
| —           | ListItem 的内容                                                                                     |
| avatar      | 列表元素的图标                                                                                      |
| title       | 列表元素的标题                                                                                      |
| description | 列表元素的描述内容                                                                                  |
| extra       | 额外内容, 通常用在 `layout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 |
| actions     | 列表操作组                                                                                          |
