# Image 图片

## 基本用法

如果要使用图片，可以使用此组件。

```js
<template>
  <y-image :src="src"></y-image>
</template>
<script>
  export default {
    data() {
      return {
        src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      }
    }
  }
</script>
```

::: demo

```html
<template>
  <y-image :src="src"></y-image>
</template>
<script>
  export default {
    data() {
      return {
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
<style></style>
```

:::

## fit

可通过 fit 确定图片如何适应到容器框. 可选值有： `fill`, `contain`, `cover`, `none`, `scale-down`

::: demo

```html
<template>
  <div class="y-flex">
    <y-image :src="src" fit="fill" class="y-m-r-20"></y-image>
    <y-image :src="src" fit="contain" class="y-m-r-20"></y-image>
    <y-image :src="src" fit="cover" class="y-m-r-20"></y-image>
    <y-image :src="src" fit="none" class="y-m-r-20"></y-image>
    <y-image :src="src" fit="scale-down"></y-image>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
<style></style>
```

:::

## 大图预览

使用 Image 组件，默认支持大图预览功能。如果像关闭预览功能，可通过设置`isPreview`为`false`.

::: demo

```html
<template>
  <div>
    <y-image :src="src" :is-preview="isPreview"></y-image>
    <y-button @click="isPreview = !isPreview" class="y-m-t-20" type="primary"
      >切换预览</y-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        isPreview: true
      }
    }
  }
</script>
<style></style>
```

:::

## 设置图片大小

如果想调整图片大小，可以通过`width`属性来设置。

::: demo

```html
<template>
  <div class="y-flex">
    <y-image :src="src" width="60" class="y-m-r-20"></y-image>
    <y-image :src="src" width="80" class="y-m-r-20"></y-image>
    <y-image :src="src" width="100" class="y-m-r-20"></y-image>
    <y-image :src="src" width="120" class="y-m-r-20"></y-image>
    <y-image :src="src" width="140"></y-image>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
<style></style>
```

:::

## Image Attributes

| 名称      | 说明                          | 类型             | 可选值                                           | 默认值 |
| --------- | ----------------------------- | ---------------- | ------------------------------------------------ | ------ |
| src       | 图片地址                      | string           | -                                                | -      |
| fit       | 图片填充方式                  | string           | `fill`, `contain`, `cover`, `none`, `scale-down` | `cover` |
| isPreview | 是否开启预览                  | boolean          | true/false                                       | true   |
| urlList   | 图片列表,ImageList 的必填参数 | array            | -                                                | []     |
| width     | 图片宽度                      | string/number |- | 104                                              |
