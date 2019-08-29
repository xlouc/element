## Descriptions 描述列表

成组展示多个只读字段，常见于详情页的信息展示。

### 基本

简单的展示。
::: demo

```html
<el-descriptions title="用户信息">
  <el-descriptions-item label="用户名">王磊</el-descriptions-item>
  <el-descriptions-item label="手机号">1810000000</el-descriptions-item>
  <el-descriptions-item label="籍贯">浙江杭州</el-descriptions-item>
  <el-descriptions-item label="描述">空</el-descriptions-item>
  <el-descriptions-item label="地址">上海市普陀区真北路788号520室</el-descriptions-item>
</el-descriptions>
```

:::

### 带边框的

带边框和背景颜色列表。
::: demo

```html
<el-descriptions title="工商注册" bordered :column="2">
  <el-descriptions-item label="注册资本">417万(元)</el-descriptions-item>
  <el-descriptions-item label="法定代表人">王磊</el-descriptions-item>
  <el-descriptions-item label="经营状态">开业</el-descriptions-item>
  <el-descriptions-item label="所属行业">其他科技推广服务业</el-descriptions-item>
  <el-descriptions-item label="统一社会信用代码">913101125587926096</el-descriptions-item>
  <el-descriptions-item label="纳税人识别号">913101125587926096</el-descriptions-item>
  <el-descriptions-item label="工商注册号">310112000993231</el-descriptions-item>
  <el-descriptions-item label="组织机构代码">55879260-9</el-descriptions-item>
  <el-descriptions-item label="登记机关">普陀区市场监管局</el-descriptions-item>
  <el-descriptions-item label="成立日期">2010-07-07</el-descriptions-item>
  <el-descriptions-item label="注册地址" :span="2">上海市普陀区真北路788号520室</el-descriptions-item>
  <el-descriptions-item label="经营范围" :span="2">
    从事信息科技、网络科技领域内的技术开发、技术服务、技术咨询、技术转让，电子商务（不得从事增值电信、金融业务），增值电信业余（按许可证），设计、制作、代理、发布各类广告，食品销售（含瓶装酒），仓储管理（除危险化学品），第三方物流服务（不得从事运输），销售：针纺织品、服装鞋帽、箱包、五金交电、家用电器、电子产品、建筑装潢材料、陶瓷制品、通信设备（除卫星电视广播地面接收设施）、食用农产品、日用百货、工艺品、厨房用品、健身器材、体育用品、数码产品、化妆品、办公用品、文具、花卉苗木、计算机设备零配件何软件产品，票务代理，自有设备租赁，汽车租赁，办公室设备维修服务，保洁服务，知识产权代理，从事互联网科技领域内的技术开发、技术咨询、技术转让、技术服务，人才中介。
    【依法须经批准的项目，经相关部门批准后方可开展经营活动】
  </el-descriptions-item>
</el-descriptions>
```

:::

### 自定义尺寸

自定义尺寸，适应在各种容器中展示。


### 带边框的

带边框和背景颜色列表。
::: demo

```html
<template>
  <el-radio-group v-model="size">
    <el-radio label="">默认</el-radio>
    <el-radio label="medium">中等</el-radio>
    <el-radio label="small">小型</el-radio>
    <el-radio label="mini">超小</el-radio>
  </el-radio-group>
  <br />
  <el-descriptions title="自定义尺寸" bordered :column="2" :size="size">
    <el-descriptions-item label="注册资本">417万(元)</el-descriptions-item>
    <el-descriptions-item label="法定代表人">王磊</el-descriptions-item>
    <el-descriptions-item label="经营状态">开业</el-descriptions-item>
    <el-descriptions-item label="所属行业">其他科技推广服务业</el-descriptions-item>
    <el-descriptions-item label="登记机关">普陀区市场监管局</el-descriptions-item>
    <el-descriptions-item label="成立日期">2010-07-07</el-descriptions-item>
    <el-descriptions-item label="经营范围" :span="2">
      从事信息科技、网络科技领域内的技术开发、技术服务、技术咨询、技术转让，电子商务（不得从事增值电信、金融业务），增值电信业余（按许可证），设计、制作、代理、发布各类广告，食品销售（含瓶装酒），仓储管理（除危险化学品），第三方物流服务（不得从事运输），销售：针纺织品、服装鞋帽、箱包、五金交电、家用电器、电子产品、建筑装潢材料、陶瓷制品、通信设备（除卫星电视广播地面接收设施）、食用农产品、日用百货、工艺品、厨房用品、健身器材、体育用品、数码产品、化妆品、办公用品、文具、花卉苗木、计算机设备零配件何软件产品，票务代理，自有设备租赁，汽车租赁，办公室设备维修服务，保洁服务，知识产权代理，从事互联网科技领域内的技术开发、技术咨询、技术转让、技术服务，人才中介。
      【依法须经批准的项目，经相关部门批准后方可开展经营活动】
    </el-descriptions-item>
  </el-descriptions>
  <br />
  <el-descriptions title="自定义尺寸" :size="size">
    <el-descriptions-item label="用户名">王磊</el-descriptions-item>
    <el-descriptions-item label="手机号">1810000000</el-descriptions-item>
    <el-descriptions-item label="籍贯">浙江杭州</el-descriptions-item>
    <el-descriptions-item label="描述">空</el-descriptions-item>
    <el-descriptions-item label="地址">上海市普陀区真北路788号520室</el-descriptions-item>
  </el-descriptions>
</template>
<script>
  export default {
    data() {
      return {
        size: ''
      }
    }
  };
</script>
```

:::


### 响应式

通过响应式的配置可以实现在小屏幕设备上的完美呈现。

:::demo

```html
<el-descriptions title="工商注册" bordered :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
  <el-descriptions-item label="注册资本">417万(元)</el-descriptions-item>
  <el-descriptions-item label="法定代表人">王磊</el-descriptions-item>
  <el-descriptions-item label="经营状态">开业</el-descriptions-item>
  <el-descriptions-item label="所属行业">其他科技推广服务业</el-descriptions-item>
  <el-descriptions-item label="工商注册号">310112000993231</el-descriptions-item>
  <el-descriptions-item label="组织机构代码">55879260-9</el-descriptions-item>
  <el-descriptions-item label="登记机关">普陀区市场监管局</el-descriptions-item>
  <el-descriptions-item label="成立日期">2010-07-07</el-descriptions-item>
  <el-descriptions-item label="注册地址" :span="2">上海市普陀区真北路788号520室</el-descriptions-item>
  <el-descriptions-item label="经营范围" :span="2">
    从事信息科技、网络科技领域内的技术开发、技术服务、技术咨询、技术转让，电子商务（不得从事增值电信、金融业务），增值电信业余（按许可证），设计、制作、代理、发布各类广告，食品销售（含瓶装酒），仓储管理（除危险化学品），第三方物流服务（不得从事运输），销售：针纺织品、服装鞋帽、箱包、五金交电、家用电器、电子产品、建筑装潢材料、陶瓷制品、通信设备（除卫星电视广播地面接收设施）、食用农产品、日用百货、工艺品、厨房用品、健身器材、体育用品、数码产品、化妆品、办公用品、文具、花卉苗木、计算机设备零配件何软件产品，票务代理，自有设备租赁，汽车租赁，办公室设备维修服务，保洁服务，知识产权代理，从事互联网科技领域内的技术开发、技术咨询、技术转让、技术服务，人才中介。
    【依法须经批准的项目，经相关部门批准后方可开展经营活动】
  </el-descriptions-item>
</el-descriptions>
```

:::

### 垂直

垂直的列表。

::: demo

```html
<el-descriptions title="用户信息" layout="vertical">
  <el-descriptions-item label="用户名">王磊</el-descriptions-item>
  <el-descriptions-item label="手机号">1810000000</el-descriptions-item>
  <el-descriptions-item label="籍贯">浙江杭州</el-descriptions-item>
  <el-descriptions-item label="描述">空</el-descriptions-item>
  <el-descriptions-item label="地址">上海市普陀区真北路788号520室</el-descriptions-item>
</el-descriptions>
```

:::

### 垂直带边框

垂直带边框和背景颜色的列表。

::: demo

```html
<template>
  <el-descriptions title="自定义尺寸" bordered :column="2" layout="vertical">
    <el-descriptions-item label="注册资本">417万(元)</el-descriptions-item>
    <el-descriptions-item label="法定代表人">王磊</el-descriptions-item>
    <el-descriptions-item label="经营状态">开业</el-descriptions-item>
    <el-descriptions-item label="所属行业">其他科技推广服务业</el-descriptions-item>
    <el-descriptions-item label="登记机关">普陀区市场监管局</el-descriptions-item>
    <el-descriptions-item label="成立日期">2010-07-07</el-descriptions-item>
    <el-descriptions-item label="经营范围">
      从事信息科技、网络科技领域内的技术开发、技术服务、技术咨询、技术转让，电子商务（不得从事增值电信、金融业务），增值电信业余（按许可证），设计、制作、代理、发布各类广告，食品销售（含瓶装酒），仓储管理（除危险化学品），第三方物流服务（不得从事运输），销售：针纺织品、服装鞋帽、箱包、五金交电、家用电器、电子产品、建筑装潢材料、陶瓷制品、通信设备（除卫星电视广播地面接收设施）、食用农产品、日用百货、工艺品、厨房用品、健身器材、体育用品、数码产品、化妆品、办公用品、文具、花卉苗木、计算机设备零配件何软件产品，票务代理，自有设备租赁，汽车租赁，办公室设备维修服务，保洁服务，知识产权代理，从事互联网科技领域内的技术开发、技术咨询、技术转让、技术服务，人才中介。
      【依法须经批准的项目，经相关部门批准后方可开展经营活动】
    </el-descriptions-item>
  </el-descriptions>
</template>
```

:::


:::tip
span DescriptionsItem 的数量。 span={2} 会占用两个 DescriptionsItem 的宽度。
:::

### Descriptions Attributes

| 参数     | 说明                                                                                            | 类型    | 可选值                | 默认值     |
| -------- | ----------------------------------------------------------------------------------------------- | ------- | --------------------- | ---------- |
| title    | 描述列表的标题，显示在最顶部                                                                    | string  | —                     | —          |
| bordered | 是否展示边框                                                                                    | boolean | —                     | `false`    |
| column   | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number  | —                     | 3          |
| size     | 设置列表的大小。可以设置为 medium 、small、mini, 或不填（只有设置 bordered={true} 生效）        | string  | medium / small / mini | —          |
| layout   | 描述布局                                                                                        | string  | horizontal / vertical | horizontal |
| colon    | 配置 `DescriptionsItem` 的 colon 的默认值                                                       | boolean | —                     | `true`     |

### DescriptionsItem Attributes

| 参数  | 说明         | 类型   | 可选值 | 默认值 |
| ----- | ------------ | ------ | ------ | ------ |
| label | 内容的描述   | string | —      | —      |
| span  | 包含列的数量 | number | —      | 1      |
