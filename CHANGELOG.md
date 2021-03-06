## [1.4.4](https://github.com/yakcodo/yak/compare/v1.4.3...v1.4.4) (2019-11-27)


### Bug Fixes

* **form-item:** 修复`v-slot:help`错误问题 ([3c3f8a7](https://github.com/yakcodo/yak/commit/3c3f8a7))



## [1.4.3](https://github.com/yakcodo/yak/compare/v1.4.2...v1.4.3) (2019-11-27)


### Bug Fixes

* **form-item:** 修复`v-slot:help`错误问题 ([9fcfc9d](https://github.com/yakcodo/yak/commit/9fcfc9d))



## [1.4.2](https://github.com/yakcodo/yak/compare/v1.4.1...v1.4.2) (2019-11-27)


### Bug Fixes

* **form-item:** 修复`v-slot:help`错误问题 ([3ac5fbd](https://github.com/yakcodo/yak/commit/3ac5fbd))
* **message-box:** 修复图表位置 ([1261da6](https://github.com/yakcodo/yak/commit/1261da6))
* **scrollbar:** 修复 FireFox 双滚动条的 bug ([f9e65f9](https://github.com/yakcodo/yak/commit/f9e65f9))
* **table:** 修复 row-style 失效的 bug ([e6b3438](https://github.com/yakcodo/yak/commit/e6b3438))



## [1.4.1](https://github.com/yakcodo/yak/compare/v1.4.0...v1.4.1) (2019-11-13)


### Reverts

* **button:** 取消错误修复 ([8b42a9c](https://github.com/yakcodo/yak/commit/8b42a9c))



## [1.4.0](https://github.com/yakcodo/yak/compare/v1.3.10...v1.4.0) (2019-11-13)


### Bug Fixes

* **avatar:** 修复IE兼容性问题 ([a9215fb](https://github.com/yakcodo/yak/commit/a9215fb))
* **avatar:** 删除没有使用的css属性 ([472aac0](https://github.com/yakcodo/yak/commit/472aac0))
* **backtop:** 使用`Cubic Bezier`滚动 ([b7353fc](https://github.com/yakcodo/yak/commit/b7353fc))
* **calendar:** 导入`el-button`和`el-button-group` ([6be3d8b](https://github.com/yakcodo/yak/commit/6be3d8b))
* **cascader:** 修复改变大小时选项没有明显变化 ([d3eb55b](https://github.com/yakcodo/yak/commit/d3eb55b))
* **cascader:** 导入声明与“CascaderOption”的局部声明冲突 ([b43fb75](https://github.com/yakcodo/yak/commit/b43fb75))
* **collapse:** fix horizontal scroll bar when expanding ([c4b1fa0](https://github.com/yakcodo/yak/commit/c4b1fa0))
* **datepicker:** hide `clear` button inside the popover too if `:clearable="false"` is specified ([539bb9f](https://github.com/yakcodo/yak/commit/539bb9f))
* **datepicker:** 修复只选中最小日期范围问题 ([90488c1](https://github.com/yakcodo/yak/commit/90488c1))
* **dialog:** fixed the timing when dialog content is recreated ([5ce7103](https://github.com/yakcodo/yak/commit/5ce7103))
* **drawer:** 修复已存在的一些问题 ([ab2d80f](https://github.com/yakcodo/yak/commit/ab2d80f))
* **dropdown:** update type file ([08ee4a6](https://github.com/yakcodo/yak/commit/08ee4a6))
* **form:** callback of validateField should be optional ([49aff08](https://github.com/yakcodo/yak/commit/49aff08))
* **icon-picker:** 修复`value`错误 ([14ff7c1](https://github.com/yakcodo/yak/commit/14ff7c1))
* **image:** fix shield the page when preview big image ([3542430](https://github.com/yakcodo/yak/commit/3542430))
* **image:** perfect picture preview behavior ([73242b1](https://github.com/yakcodo/yak/commit/73242b1))
* **image:** 修复IE10不支持Object.values ([7cc7523](https://github.com/yakcodo/yak/commit/7cc7523))
* **infinite-scroll:** fix trigger when component is invisable ([19d932c](https://github.com/yakcodo/yak/commit/19d932c))
* **input:** triggle input event when using autofill under IME mode ([e1cf5f6](https://github.com/yakcodo/yak/commit/e1cf5f6))
* **menu:** fix router NavigationDuplicated error when using vue-router@^3.1.0 ([ddf8259](https://github.com/yakcodo/yak/commit/ddf8259))
* **menu:** fix that the SubMenu parent component is not a Menu component cause stack overflow ([c0565c3](https://github.com/yakcodo/yak/commit/c0565c3))
* **menu:** 修复`updateActiveIndex` BUG ([7bde9a5](https://github.com/yakcodo/yak/commit/7bde9a5))
* **message:** fix close instace offsetHeight ([6a3ad7c](https://github.com/yakcodo/yak/commit/6a3ad7c))
* **messagebox:** 修复 icon 位置异常 ([2885749](https://github.com/yakcodo/yak/commit/2885749))
* **radio:** 优化`provide-inject` ([77f1203](https://github.com/yakcodo/yak/commit/77f1203))
* **radio-button:** fix display error ([758ac9c](https://github.com/yakcodo/yak/commit/758ac9c))
* **select:** fix select component cannot scroll to the selected location by default ([587afb6](https://github.com/yakcodo/yak/commit/587afb6))
* **select:** fix tag show value or empty issue ([cd70b08](https://github.com/yakcodo/yak/commit/cd70b08))
* **select:** prevent browser autocomplete ([bdc3f18](https://github.com/yakcodo/yak/commit/bdc3f18))
* **select:** 修复改变大小时选项没有明显变化 ([c27339f](https://github.com/yakcodo/yak/commit/c27339f))
* **slider:** 修复slider滑块出现在有固定列的表格时，滑块圆点层级盖在固定列之上的bug ([2bef73e](https://github.com/yakcodo/yak/commit/2bef73e))
* **table:** column sort handle null and undefined ([f0373f0](https://github.com/yakcodo/yak/commit/f0373f0))
* **table:** fix header table not display ([6fc6f14](https://github.com/yakcodo/yak/commit/6fc6f14))
* **table:** 修复`firefox`中从隐藏到显示表闪烁的问题 ([f113ade](https://github.com/yakcodo/yak/commit/f113ade))
* **table:** 修复固定高滚动问题 ([d65d72a](https://github.com/yakcodo/yak/commit/d65d72a))
* **table:** 修复显示无效的固定行样式 ([c51d2ed](https://github.com/yakcodo/yak/commit/c51d2ed))
* 删除废弃属性 ([74ebc20](https://github.com/yakcodo/yak/commit/74ebc20))
* **table:** 修复过滤后固定表头高度 ([12b67de](https://github.com/yakcodo/yak/commit/12b67de))
* **table:** 更新table表头单元格样式 ([95d03e3](https://github.com/yakcodo/yak/commit/95d03e3))
* **table:** 表头可以自定义 ([7df9fd3](https://github.com/yakcodo/yak/commit/7df9fd3))
* **timepicker:** set the selection range after scrolling up or down ([30f34a1](https://github.com/yakcodo/yak/commit/30f34a1))
* **transfer:** 修复按钮样式错误 ([583a3aa](https://github.com/yakcodo/yak/commit/583a3aa))
* **tree:** add expandAfterFilter option in Tree Component ([93637fa](https://github.com/yakcodo/yak/commit/93637fa))
* **tree:** 添加空数据时字体大小 ([b9700b6](https://github.com/yakcodo/yak/commit/b9700b6))


### Features

* **divider:** 新增分割线文案的位置：`top` 和 `bottom` ([dbd39b7](https://github.com/yakcodo/yak/commit/dbd39b7))
* **form-item:** 新增了一个新的 API `help` 来控制是否显示文案提示 ([15e4c2a](https://github.com/yakcodo/yak/commit/15e4c2a))
* **form-item:** 新增了一个新的 API `help` 来控制是否显示文案提示 ([5dbc54d](https://github.com/yakcodo/yak/commit/5dbc54d))
* **infinitescroll:** skip trigger event on invisible element ([b757fd6](https://github.com/yakcodo/yak/commit/b757fd6))
* **popconfirm:** add popconfirm component ([b732c77](https://github.com/yakcodo/yak/commit/b732c77))
* **progress:** add strokeLinecap prop ([249b133](https://github.com/yakcodo/yak/commit/249b133))
* **table:** 字段过滤添加文本搜索 ([f40b535](https://github.com/yakcodo/yak/commit/f40b535))
* **tree-select:** 新增组件`TreeSelect` ([938ed46](https://github.com/yakcodo/yak/commit/938ed46))


### Reverts

* **avatar:** recover removed css-property ([ecf082f](https://github.com/yakcodo/yak/commit/ecf082f))



## [1.3.10](https://github.com/yakcodo/yak/compare/v1.3.9...v1.3.10) (2019-10-19)


### Bug Fixes

* **list-item:** 修复`isFlexMode`逻辑错误 ([b229fba](https://github.com/yakcodo/yak/commit/b229fba))



## [1.3.9](https://github.com/yakcodo/yak/compare/v1.3.8...v1.3.9) (2019-10-19)


### Bug Fixes

* **list:** 修复ListItem中`isFlexMode`插口为异步组件时计算错误 ([b438630](https://github.com/yakcodo/yak/commit/b438630))



## [1.3.8](https://github.com/yakcodo/yak/compare/v1.3.7...v1.3.8) (2019-10-19)


### Bug Fixes

* **list:** 修复`isFlexMode`计算报错 ([1c28570](https://github.com/yakcodo/yak/commit/1c28570))
* **list:** 修复`isFlexMode`计算错误 ([aab1109](https://github.com/yakcodo/yak/commit/aab1109))



## [1.3.7](https://github.com/yakcodo/yak/compare/v1.3.6...v1.3.7) (2019-10-19)


### Bug Fixes

* **list:** 修复`isFlexMode`计算错误 ([267e2a8](https://github.com/yakcodo/yak/commit/267e2a8))
* **list:** 修复`isFlexMode`逻辑错误 ([db83b14](https://github.com/yakcodo/yak/commit/db83b14))



## [1.3.6](https://github.com/yakcodo/yak/compare/v1.3.5...v1.3.6) (2019-10-19)


### Bug Fixes

* **list:** 修复`isFlexMode`逻辑错误 ([1e4638f](https://github.com/yakcodo/yak/commit/1e4638f))
* **utils:** 修复`isVNode`判断错误 ([bbd0f8e](https://github.com/yakcodo/yak/commit/bbd0f8e))



## [1.3.5](https://github.com/yakcodo/yak/compare/v1.3.4...v1.3.5) (2019-10-17)


### Bug Fixes

* **menu:** 修复菜单主题色 ([90b2a9a](https://github.com/yakcodo/yak/commit/90b2a9a))


### Features

* **icon-picker:** 新增图标选择器 ([717b74c](https://github.com/yakcodo/yak/commit/717b74c))
* **treemap:** 新增组织结构图 ([0120ae3](https://github.com/yakcodo/yak/commit/0120ae3))



## [1.3.4](https://github.com/yakcodo/yak/compare/v1.3.3...v1.3.4) (2019-10-10)


### Bug Fixes

* **popper.js:** 修复升级`popper.js`引发的样式错位 ([c7d6ef6](https://github.com/yakcodo/yak/commit/c7d6ef6))
* **select:** 修复异步渲染时下拉框宽度不能获取正确 ([193c4a6](https://github.com/yakcodo/yak/commit/193c4a6))
* **vue-popper.js:** 删除日志打印 ([d7048b3](https://github.com/yakcodo/yak/commit/d7048b3))



## [1.3.3](https://github.com/yakcodo/yak/compare/v1.3.2...v1.3.3) (2019-09-24)


### Bug Fixes

* **countup:** 修复编译错误 ([a976e31](https://github.com/yakcodo/yak/commit/a976e31))



## [1.3.2](https://github.com/yakcodo/yak/compare/v1.3.1...v1.3.2) (2019-09-24)


### Bug Fixes

* **list:** 修复`list-item`渲染判断错误 ([03fba9b](https://github.com/yakcodo/yak/commit/03fba9b))


### Features

* **statistic:** 新增统计数值 ([c18becd](https://github.com/yakcodo/yak/commit/c18becd))



## [1.3.1](https://github.com/yakcodo/yak/compare/v1.3.0...v1.3.1) (2019-09-17)


### Bug Fixes

* **page-header:** 修复 PageHeader 中返回图标与面包屑无法共存的问题。 ([2039a7a](https://github.com/yakcodo/yak/commit/2039a7a))


### Performance Improvements

* **tabs:** 优化`tab-bar`位置计算方法 ([aae1442](https://github.com/yakcodo/yak/commit/aae1442))



# [1.3.0](https://github.com/yakcodo/yak/compare/v1.2.5...v1.3.0) (2019-09-12)


### Bug Fixes

* **calendar:** 修复日期的显示问题 ([259c0bc](https://github.com/yakcodo/yak/commit/259c0bc))
* **calendar:** 修复在夏令时的显示问题 ([af21d79](https://github.com/yakcodo/yak/commit/af21d79))
* **carousel:** 修复`onChange`触发条件 ([aeda89e](https://github.com/yakcodo/yak/commit/aeda89e))
* **cascader:** 禁用状态下，关闭按钮不显示 ([5d4f8eb](https://github.com/yakcodo/yak/commit/5d4f8eb))
* **cascader:** 修复 CascaderPanel 的显示问题 ([c2258d7](https://github.com/yakcodo/yak/commit/c2258d7))
* **datepicker:** 给`picker-option`添加`className`属性 ([b9dd05a](https://github.com/yakcodo/yak/commit/b9dd05a))
* **datetimepicker:** 修复时间选择滚动条的问题 ([d821f24](https://github.com/yakcodo/yak/commit/d821f24))
* **dialog:** 添加 SCSS 变量 ([5cea758](https://github.com/yakcodo/yak/commit/5cea758))
* **divider:** 支持自定义类 ([186c3e7](https://github.com/yakcodo/yak/commit/186c3e7))
* **i18n:** 更新阿拉伯语翻译 ([06d91b4](https://github.com/yakcodo/yak/commit/06d91b4))
* **i18n:** remove translation of 'year' in catalan language as in the other languages ([1176f59](https://github.com/yakcodo/yak/commit/1176f59))
* **icon:** adding font-display to [@font-face](https://github.com/font-face) declaration ([853c372](https://github.com/yakcodo/yak/commit/853c372))
* **input:** 触发清除按钮的点击事件 ([f8c1b95](https://github.com/yakcodo/yak/commit/f8c1b95))
* **input:** 修复韩语输入问题 ([9490764](https://github.com/yakcodo/yak/commit/9490764))
* **notification:** 不修改传入的 option ([2134e24](https://github.com/yakcodo/yak/commit/2134e24))
* **radiogroup:** is 指定时，不产生非法的 HTML 片段 ([ef8f962](https://github.com/yakcodo/yak/commit/ef8f962))
* **select:** 过滤时，不收起下拉框 ([f3efd4d](https://github.com/yakcodo/yak/commit/f3efd4d))
* **table:** 把 toggleAllSelection 设置为 Table 示例的属性 ([009a0a8](https://github.com/yakcodo/yak/commit/009a0a8))
* **table:** 调用 toggleExpansion 不再抛出异常 ([aa2901a](https://github.com/yakcodo/yak/commit/aa2901a))
* **table:** 挂载时不再触发 sort-change 事件 ([601d5a1](https://github.com/yakcodo/yak/commit/601d5a1))
* **table:** 修复 setCurrentRow 方法不生效的问题 ([870689c](https://github.com/yakcodo/yak/commit/870689c))
* **table:** 修复表头 display 为 none 造成浏览器崩溃的问题 ([46dd6d8](https://github.com/yakcodo/yak/commit/46dd6d8))
* **table:** 修复当数据异步加载时，expand-row-keys 不生效的问题 ([3eabe63](https://github.com/yakcodo/yak/commit/3eabe63))
* **table:** 在表头拖拽后阻止`click`事件的触发 ([0b589e2](https://github.com/yakcodo/yak/commit/0b589e2))
* **tabs:** 修复 TabItem 位置不正确的问题 ([2d952ef](https://github.com/yakcodo/yak/commit/2d952ef))
* **tabs:** 修复高亮的 Tab 不在可视区的问题 ([8a84232](https://github.com/yakcodo/yak/commit/8a84232))
* **transfer:** 修复样式问题 ([b347d89](https://github.com/yakcodo/yak/commit/b347d89))
* **tree:** 修复文字与复选框之间的距离 ([d1e4ceb](https://github.com/yakcodo/yak/commit/d1e4ceb))
* **upload:** 修复`upload` TypeScript 属性错误 ([706f0eb](https://github.com/yakcodo/yak/commit/706f0eb))
* 添加更新日志 ([adaaa35](https://github.com/yakcodo/yak/commit/adaaa35))


### Features

* **i18n:** 新增`Esperanto`翻译 ([65b0605](https://github.com/yakcodo/yak/commit/65b0605))
* **popover:** 添加`close-delay`属性 ([c381c6e](https://github.com/yakcodo/yak/commit/c381c6e))


### Performance Improvements

* **checkbox:** 提高可访问性 ([3bd154b](https://github.com/yakcodo/yak/commit/3bd154b))



## [1.2.5](https://github.com/yakcodo/yak/compare/c306fad...v1.2.5) (2019-09-07)


### Bug Fixes

* **form:** 修复不同模式是否显示冒号的问题 ([59f9ab0](https://github.com/yakcodo/yak/commit/59f9ab0))
* **form:** 修复表单`inline`模式`label`样式问题 ([0d8ea41](https://github.com/yakcodo/yak/commit/0d8ea41))
* **PageHeader:** 修复按需导入缺失部分样式问题 ([6efcfb0](https://github.com/yakcodo/yak/commit/6efcfb0))
* **Result:** 修复图片模式样式错误 ([4016d25](https://github.com/yakcodo/yak/commit/4016d25))
* 修复图标头像会有底色的问题 ([4aa3f6d](https://github.com/yakcodo/yak/commit/4aa3f6d))


### Features

* **checkbox:** 优化多选框选中样式 ([62cd059](https://github.com/yakcodo/yak/commit/62cd059))
* **Descriptions:** 新增`Descriptions 描述列表`组件 ([49994dc](https://github.com/yakcodo/yak/commit/49994dc))
* **Empty:** 新增`Empty 空状态`组件 ([8fae530](https://github.com/yakcodo/yak/commit/8fae530))
* **List:** 新增`List 列表`组件 ([47ca767](https://github.com/yakcodo/yak/commit/47ca767))
* **Message:** 新增`loading`主题 ([af68d8f](https://github.com/yakcodo/yak/commit/af68d8f))
* **radio:** 优化单选框，选中交互样式 ([c306fad](https://github.com/yakcodo/yak/commit/c306fad))
* **Result:** 新增`Result 结果`组件 ([0f8f568](https://github.com/yakcodo/yak/commit/0f8f568))
* **Skeleton:** 新增`Skeleton 骨架屏 `组件 ([5c0dd27](https://github.com/yakcodo/yak/commit/5c0dd27))


### Performance Improvements

* **Badge:** 优化`Badge 标记`组件 ([6f507bc](https://github.com/yakcodo/yak/commit/6f507bc))
* **dialog:** 优化`dialog`打开和关闭动画 ([7358441](https://github.com/yakcodo/yak/commit/7358441))
* **drawer:** 优化`Drawer 抽屉`组件，多层嵌套弹出动画 ([9a71482](https://github.com/yakcodo/yak/commit/9a71482))
* **input,checkbox,select,transfer,message-box:** 优化默认颜色 ([6389e6c](https://github.com/yakcodo/yak/commit/6389e6c))
* **menu:** 优化菜单分组标题颜色 ([b9bda9a](https://github.com/yakcodo/yak/commit/b9bda9a))
* **menu:** 优化菜单自定义颜色 ([8f46f6b](https://github.com/yakcodo/yak/commit/8f46f6b))
* **PageHeader:** 优化`PageHeader 页头`组件 ([bee489a](https://github.com/yakcodo/yak/commit/bee489a))
* **Pagination:** 优化`background`模式 ([86940e6](https://github.com/yakcodo/yak/commit/86940e6))
* **radio:** 优化radio样式错位 ([6bdd33e](https://github.com/yakcodo/yak/commit/6bdd33e))
* **radio,checkbox:** 优化`bordered`模式下样式会错位的问题 ([2d5a067](https://github.com/yakcodo/yak/commit/2d5a067))
* **Table:** 优化空数据时，使用空状态`el-empty `组件 ([f1afa37](https://github.com/yakcodo/yak/commit/f1afa37))
* **tag:** 优化`tag 标签`自定义主题色 ([39f5482](https://github.com/yakcodo/yak/commit/39f5482))
* **timeline:** 优化节点自定大小和默认大小 ([5085446](https://github.com/yakcodo/yak/commit/5085446))



