# ImageViewer 图片预览

## 基本用法

```js {2}
<template>
  <y-image-viewer :visible.sync="visible" :url-list="urlList"></y-image-viewer>
</template>
```

::: demo

```html
<template>
  <div>
    <y-button type="text" @click="visible=true">查看</y-button>
    <y-image-viewer
      :visible.sync="visible"
      :url-list="urlList"
    ></y-image-viewer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
        urlList: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        ]
      }
    }
  }
</script>
<style></style>
```

:::

## ImageViewer Attributes

| 名称    | 说明             | 类型    | 可选值 | 默认值 |
| ------- | ---------------- | ------- | ------ | ------ |
| visible | 是否显示图片预览 | boolean | -      | false  |
| urlList | 预览图片列表     | array   | -      | []     |
