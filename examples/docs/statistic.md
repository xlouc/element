## Statistic 统计数值

展示统计数值。

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

### 基本用法

:::demo

```html
<el-row :gutter="16">
  <el-col :span="12">
    <el-statistic title="激活用户" :value="112893" countup></el-statistic>
  </el-col>
  <el-col :span="12">
    <el-statistic
      title="账户余额 (人民币)"
      :value="112893"
      :precision="2"
    ></el-statistic>
  </el-col>
</el-row>
```

:::

### 单位

通过前缀和后缀添加单位。

:::demo

```html
<el-row :gutter="16">
  <el-col :span="12">
    <el-statistic title="Fork" :value="51552" countup>
      <template v-slot:prefix>
        <i class="el-icon-fork"></i>
      </template>
    </el-statistic>
  </el-col>
  <el-col :span="12">
    <el-statistic title="合并请求" :value="93" suffix="/ 100"></el-statistic>
  </el-col>
</el-row>
```

:::

### 在卡片中使用

在卡片中展示统计数值。
:::demo

```html
<el-row :gutter="16" :style="{ background: '#ECECEC', padding: '30px' }">
  <el-col :span="12">
    <el-card class="box-card">
      <el-statistic
        title="激活"
        :value="11.28"
        countup
        :precision="2"
        :valueStyle="{ color: '#3f8600' }"
        suffix="%"
      >
        <template v-slot:prefix>
          <i class="el-icon-arrowup"></i>
        </template>
      </el-statistic>
    </el-card>
  </el-col>
  <el-col :span="12">
    <el-card class="box-card">
      <el-statistic
        title="空闲"
        :value="9.3"
        countup
        :precision="2"
        :valueStyle="{ color: '#cf1322' }"
        suffix="%"
      >
        <template v-slot:prefix>
          <i class="el-icon-arrowdown"></i>
        </template>
      </el-statistic>
    </el-card>
  </el-col>
</el-row>
```

:::

### Attributes

| 参数       | 说明             | 类型            | 可选值 | 默认值 |
| ---------- | ---------------- | --------------- | ------ | ------ |
| separator  | 设置千分位标识符 | string          | —      | `,`    |
| decimal    | 设置小数点       | string          | —      | `.`    |
| precision  | 数值精度         | number          | —      | —      |
| formatter  | 自定义数值展示   | function        | —      | -      |
| countup    | 启用数字滚动     | boolean         | —      | -      |
| prefix     | 设置数值的前缀   | string          | —      | -      |
| suffix     | 设置数值的后缀   | string          | —      | -      |
| title      | 数值的标题       | string          | —      | -      |
| value      | 数值内容         | string / number | —      | -      |
| valueStyle | 设置数值的样式   | string / object | —      | -      |

### Slot

| name   | 说明             |
| ------ | ---------------- |
| —      | 自定义数值内容   |
| prefix | 自定义数值的前缀 |
| suffix | 自定义数值的后缀 |
