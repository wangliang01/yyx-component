# yyx-component

云优选组件库，一个基于[Element](https://element.eleme.cn/#/zh-CN)进行二次开发的组件库

## 安装
### npm 安装
推荐使用npm的方式安装，它能更好地和webpack打包工具配合使用

```node
npm i yyx-component -S 
```

## 快速上手
### 引入yui
在main.js中写入以下内容
```js
import Vue from 'vue
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import yui from 'yyx-component'
import 'yyx-component/lib/yui.css'
import App from './App.vue';

Vue.use(yui)

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

# 目前该组件库存在的问题
1. 不支持树型表格