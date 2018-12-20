# give543-mobile

> GIVE543 Mobile

## Git

### branch -- dev && build-dev
分离开发分支和测试环境分支，`dev`分支只做开发，`build-dev`专用于打包发布到测试环境，同理，在测试环境下通过后，部署线上也是直接在`master`合并`dev`分支。

**build-dev**分支不允许开发

## 使用须知

### yarn or npm
项目默认使用yarn

### vue-devtools
项目默认不使用Logger插件，推荐使用 [vue-tools](https://github.com/vuejs/vue-devtools) 工具开发调试

### eslint
项目采用 vue-cli 生成的标准eslint规则，如有更改eslint，需在告知全体开发人员并2/3同意后再生产采用

### 组件或样式
严格规定，无论是组件或是样式本项目最深嵌套层数不得超过3层

书写样式表时，尽量避免堆砌不必要的优先级来使样式生效，生产环境下谨慎使用`!important`

### 单元测试
基础组件推荐开发过程中写单元测试，如若开发进度慢时间紧，须在测试环境后覆盖测试

### moment
项目为移动端开发，**不允许使用moment**，如须格式化时间使用[date-fns](https://github.com/date-fns/date-fns)

### iPhoneX适配

```
// 1.viewport meta 标签增加属性viewport-fit=cover
<meta name="viewport" content="width=device-width, viewport-fit=cover, xxxx">
// 2.body元素增加样式
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
// 3.如有fixed底部的元素，也增加上面样式
xxx {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff; // 记得添加background-color，不然会出现透明镂空的情况
}
```

### iOS 时间格式
兼容iOS时间格式应为 yyyy/mm/dd，不能为 yyyy-mm-dd

### user-scale 在iOS下不生效的问题
[From the iOS 10 beta 1 release notes](https://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari):

```
To improve accessibility on websites in Safari, users can now pinch-to-zoom even when a website sets user-scalable=no in the viewport.
I expect we're going to see a JS add-on soon to disable this in some way.
```
## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn start

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
