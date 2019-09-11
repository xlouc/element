<p align="center">
  <img src="https://github.com/yakcodo/yak/raw/develop/yak_logo.png">
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/yak-ui">
    <img src="https://img.shields.io/npm/v/yak-ui.svg">
  </a>
  <a href="https://npmcharts.com/compare/yak-ui?minimal=true">
    <img src="https://img.shields.io/npm/dm/yak-ui.svg">
  </a>
  <a href="https://github.com/yakcodo/yak/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

> A Vue.js 2.0 UI Toolkit for Web.

## 关于 yak-ui

Yak, 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。他是从 [Element](https://github.com/ElemeFE/element) 发展而来，不过我们已经 Fork 并且命名为 Yak。对于我们 Fork 的原因可以看[这里](https://github.com/yakcodo/yak/wiki/about)。

## 安装

```shell
npm i yak-ui -S
```

## 快速入门

```javascript
import Vue from "vue";
import Yak from "yak-ui";

Vue.use(Yak);

// or
import {
  Select,
  Button
  // ...
} from "yak-ui";

Vue.component(Select.name, Select);
Vue.component(Button.name, Button);
```

## 浏览器支持

现代浏览器 和 Internet Explorer 10+.

## 开发

如果你只想用`Yak`，跳过这一部分。

对于那些对`Yak`感兴趣的人，请参考我们的[贡献指南]()

## Changelog

每个版本的详细更改记录在[发行说明](https://github.com/yakcodo/yak/releases).
