# yyx-component

云优选组件库，一个基于[Element](https://element.eleme.cn/#/zh-CN)进行二次开的组件库

## 安装
### npm 安装
推荐使用npm的方式安装，它能更好地和webpack打包工具配合使用

```node
npm i yui -S // 或者 yarn add yui
```

## 快速上手
### 引入yui
在main.js中写入以下内容
```js
import Vue from 'vue
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import yui from 'yui'
import App from './App.vue';

Vue.use(yui)

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

wangliang01

1392830517@qq.com

npm login --registry http://registry.npmjs.org

npm publish --registry http://registry.npmjs.org