## 快速上手
本节将介绍如何在项目中使用 yyx-component。

### 使用 vue-cli@3
我们为新版的 vue-cli 准备了相应的 yyx-conent 插件，你可以用它们快速地搭建一个基于 yyx-component 的项目。

### 引入 yyx-component
因为yyx-component是基于Element进行二次开发的，所以在要引入Element跟yyx-component。

完整引入
在main.js中写入以下内容：
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import yyx from 'yyx-component'
import 'element-ui/lib/theme-chalk/index.css';
import 'yyx-component/lib/yui.css'
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(yyx)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
