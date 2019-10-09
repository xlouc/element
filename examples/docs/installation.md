## 安装

:::danger 关于Yak
Yak, 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。他是从 [Element](https://github.com/ElemeFE/element) 发展而来，不过我们已经 Fork 并且命名为 Yak。对于我们Fork的原因可以看[这里](#/guide/about)。
:::

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i yak-ui -S
```

### CDN

目前可以通过 [unpkg.com/yak-ui](https://unpkg.com/yak-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="//unpkg.com/yak-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="//unpkg.com/yak-ui/lib/yak.umd.min.js"></script>
```

:::tip
我们建议使用 CDN 引入 Yak 的用户在链接地址上锁定版本，以免将来 Yak 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::
