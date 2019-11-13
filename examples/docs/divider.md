## Divider 分割线

区隔内容的分割线。

### 基础用法

对不同章节的文本段落进行分割。

:::demo
```html
<template>
  <div>
    <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
    <el-divider></el-divider>
    <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
  </div>
</template>
```
:::

### 设置文案

可以在分割线上自定义文案内容。


:::demo
```html
<template>
  <div>
    <el-divider content-position="left">元稹 · 《闻乐天授江州司马》</el-divider>
    <span>残灯无焰影幢幢，此夕闻君谪九江。</span>
    <span>垂死病中惊坐起，暗风吹雨入寒窗。</span>
    <el-divider>
      <i class="el-icon-container"></i>元好问· 《摸鱼儿·雁丘辞》
    </el-divider>
    <span>问世间情是何物?直教生死相许。天南地北双飞客，老翅几回寒暑。欢乐趣，离别苦，就中更有痴儿女。君应有语，渺万里层云，千山暮雪，只影向谁去?</span>
    <span>横汾路，寂寞当年箫鼓。荒烟依旧平楚。招魂楚些何嗟及，山鬼暗啼风雨。天也妒，未信与，莺儿燕子俱黄土。千秋万古，为留待骚人，狂歌痛饮，来访雁丘处。</span>
    <el-divider content-position="right">阿里云</el-divider>
    <span>为了无法计算的价值</span>
    <br>
    <el-divider content-position="top">魏子安 · 《花月痕·第十五回诗》</el-divider>
    <span>多情自古空余恨，好梦由来最易醒。</span>
    <span>岂是拈花难解脱，可怜飞絮太飘零。</span>
    <span>香巢乍结鸳鸯社，新句犹书翡翠屏。</span>
    <span>不为别离已肠断，泪痕也满旧衫青。</span>
    <el-divider content-position="bottom">欧阳修· 《玉楼春》</el-divider>
    <span>尊前拟把归期说。未语春容先惨咽。</span>
    <span>人生自是有情痴，此恨不关风与月。</span>
    <span>离歌且莫翻新阕。一曲能教肠寸结。</span>
    <span>直须看尽洛城花，始共春风容易别。</span>
  </div>
</template>
```
:::

### 垂直分割

:::demo
```html
<template>
  <div>
    <span>雨纷纷</span>
    <el-divider direction="vertical"></el-divider>
    <span>旧故里</span>
    <el-divider direction="vertical"></el-divider>
    <span>草木深</span>
  </div>
</template>
```
:::

### Divider Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| direction      | 设置分割线方向  | string  |            horizontal / vertical          |    horizontal     |
| content-position      | 设置分割线文案的位置 | string  |  left / right / center/ top / bottom  |  center |
