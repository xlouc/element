## Skeleton 骨架屏

在需要等待加载内容的位置提供一个占位图形组合。

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只适合用在第一次加载数据的场景。
- 可以被 Spin 完全代替，但是在可用的场景下可以比 Spin 提供更好的视觉效果和用户体验。

### 基本

最简单的占位效果。

:::demo

```html
<el-skeleton :loading="true"></el-skeleton>
```

:::

### 复杂的组合

更复杂的组合。

:::demo

```html
<el-skeleton :loading="true" avatar :paragraph="{ rows: 4 }"></el-skeleton>
```

:::

### 动画效果

显示动画效果。

:::demo

```html
<el-skeleton :loading="true" active avatar></el-skeleton>
```

:::

### 包含子组件

加载占位图包含子组件。

:::demo

```html
<p>
  <el-switch v-model="loading"></el-switch>
</p>
<el-list layout="vertical">
  <el-skeleton
    :loading="loading"
    active
    avatar
    tag="el-list-item"
    v-for="(item, index) in listData"
    :key="'skeleton-' + index"
  >
    <el-list-item
      :avatar="item.avatar"
      :title="item.title"
      :description="item.description"
      key="skeleton"
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
  </el-skeleton>
</el-list>

<script>
  export default {
    data() {
      return {
        loading: true
      };
    },
    computed: {
      listData() {
        if (this.loading) {
          return [{}, {}, {}];
        }
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
        return listData;
      }
    }
  };
</script>
```

:::

### Attributes

| 属性      | 说明                                                   | 类型                                 | 可选值 | 默认值 |
| --------- | ------------------------------------------------------ | ------------------------------------ | ------ | ------ |
| active    | 是否展示动画效果                                       | boolean                              | -      | false  |
| avatar    | 是否显示头像占位图。`size`头像的大小,`shape`头像的形状 | boolean / object{ 'size' / 'shape' } | -      | false  |
| loading   | 为 `true` 时，显示占位图。反之则直接展示子组件         | boolean                              | -      |        |
| title     | 是否显示标题占位图。并且设置标题占位图的宽度           | boolean / number / string            | -      | true   |
| paragraph | 是否显示段落占位图;`rows`段落行数;`width`段落宽度      | boolean / object{ 'rows' / 'width' } | -      | true   |
