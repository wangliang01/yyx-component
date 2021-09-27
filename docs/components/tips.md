## Tips 提示组件

### 基本用法

::: demo

```html
<template>
  <y-tips>床前明月光，疑是地上霜</y-tips>
</template>
<script>
  export default {}
</script>
<style>
  i{
    margin-right: 12px
  }
</style>
```

:::

## 调整 tips 图标大小

如果默认图标不满足需求，可以通过设置`size`来调整。

::: demo

```html
<template>
  <div>
    <y-tips size="10">床前明月光，疑是地上霜</y-tips>
    <y-tips size="20">床前明月光，疑是地上霜</y-tips>
    <y-tips size="30">床前明月光，疑是地上霜</y-tips>
    <y-tips size="40">床前明月光，疑是地上霜</y-tips>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  i{
    margin-right: 12px
  }
</style>
```

:::

## 调整 tips 图标颜色

如果默认图标颜色不满足需求，可能通过设置`color`来调整。

::: demo

```html
<template>
  <div>
    <y-tips color="green">床前明月光，疑是地上霜</y-tips>
    <y-tips color="red">床前明月光，疑是地上霜</y-tips>
    <y-tips color="#0000FF">床前明月光，疑是地上霜</y-tips>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  i{
    margin-right: 12px
  }
</style>
```

:::

## 提示信息位置

如果提示信息位置不满足需求，可以通过设置`placement`来调整。

::: demo

```html
<template>
  <div>
    <y-tips placement="top">床前明月光，疑是地上霜</y-tips>
    <y-tips placement="bottom">床前明月光，疑是地上霜</y-tips>
    <y-tips placement="left">床前明月光，疑是地上霜</y-tips>
    <y-tips placement="right">床前明月光，疑是地上霜</y-tips>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  i{
    margin-right: 12px
  }
</style>
```

:::

## 提示信息主题

Tips 组件提供了两个不同的主题：`dark`和`light`

::: demo

```html
<template>
  <div>
    <y-tips effect="dark">床前明月光，疑是地上霜</y-tips>
    <y-tips effect="light">床前明月光，疑是地上霜</y-tips>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  i{
    margin-right: 12px
  }
</style>
```

:::

## 提示图标

Tips 组件图标可根据图标库中的class名进行改变

::: demo

```html
<template>
  <div>
    <y-tips icon="icon-tishi">我是提示</y-tips>
    <y-tips icon="icon-xiala">我是下拉</y-tips>
    <y-tips icon="icon-guanlian">我是关联</y-tips>
  </div>
</template>
<script>
  export default {}
</script>
<style>
  i{
    margin-right: 12px
  }
</style>
```

:::

::: danger
tips 组件，提示信息在 vuepress 中没有显示出来，但不影响在项目中使用。
:::

## Tips Attribuites

| 名称      | 说明             | 类型          | 可选值                                                                                                    | 默认值    |
| --------- | ---------------- | ------------- | --------------------------------------------------------------------------------------------------------- | --------- |
| size      | tips 图标大小    | string/number | -                                                                                                         | 14        |
| color     | tips 图标颜色    | string        | 能够被浏览器识别的颜色值                                                                                    | `#979797`, `red` |
| placement | 提示信息位置     | string        | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | `top`     |
| effect    | 提示信息背景主题 | string        | `light`,`dark`                                                                                            | `light`   |
| icon      | tips 图标       | string        | Iconfont中支持的class名称（参见Icon图标集合）                                                                | `icon-tishi`   |


