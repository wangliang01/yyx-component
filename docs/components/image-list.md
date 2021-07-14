# ImageList 图片列表

用来展示图片列表。

## 基本用法

```js {2}
<template>
  <y-image-list :url-list="urls"></y-image-list>
</template>
```

::: demo

```html
<template>
  <y-image-list :url-list="urls"></y-image-list>
</template>
<script>
  export default {
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
  }
</script>
<style></style>
```

:::

## 设置图片间距

如果默认间距不合适，可以通过设置`offset`来调整。

::: demo

```html
<template>
  <y-image-list :url-list="urls" offset="25"></y-image-list>
</template>
<script>
  export default {
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
  }
</script>
<style></style>
```

:::

## ImageList Attributes

| 名称    | 说明         | 类型          | 可选值 | 默认值 |
| ------- | ------------ | ------------- | ------ | ------ |
| urlList | 图片地址列表 | array         | -      | []     |
| offset  | 图片间距     | string/number | -      | 16     |
