# Tips 提示组件

## 基础用法

```html {2}
<template>
  <y-tips>床前明月光，疑是地上霜</y-tips>
</template>
```

::: demo

```html
<template>
  <y-tips>床前明月光，疑是地上霜</y-tips>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## 调整 tips 图标大小

如果默认图标不满足需求，可以通过设置`size`来调整。

```html {2}
<template>
  <y-tips size="20">床前明月光，疑是地上霜</y-tips>
</template>
```

::: demo

```html
<template>
  <y-tips size="20">床前明月光，疑是地上霜</y-tips>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## 调整 tips 图标颜色

如果默认图标颜色不满足需求，可能通过设置`color`来调整。

```html {2}
<template>
  <y-tips color="green">床前明月光，疑是地上霜</y-tips>
</template>
```

::: demo

```html
<template>
  <y-tips color="green">床前明月光，疑是地上霜</y-tips>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## 提示信息位置

如果提示信息位置不满足需求，可以通过设置`placement`来调整。

```html {2}
<template>
  <y-tips placement="bottom">床前明月光，疑是地上霜</y-tips>
</template>
```

::: demo

```html
<template>
  <y-tips placement="bottom">床前明月光，疑是地上霜</y-tips>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## 提示信息主题

Tips 组件提供了两个不同的主题：`dark`和`light`
::: demo

```html
<template>
  <y-tips effect="dark">床前明月光，疑是地上霜</y-tips>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

::: danger
tips 组件，提示信息在 vuepress 中没有显示出来，但不影响在项目中使用。
:::

## Tips Attribuites

| 名称      | 说明             | 类型          | 可选值                                                                                                    | 默认值    |
| --------- | ---------------- | ------------- | --------------------------------------------------------------------------------------------------------- | --------- |
| size      | <div style="width: 150px;">tips 图标大小</div>    | string/number | -                                                                                                         | 14        |
| color     | tips 图标颜色    | string        | 能够被浏览器识别的颜色值                                                                                  | `#979797` |
| placement | 提示信息位置     | string        | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | `top`     |
| effect    | 提示信息背景主题 | string        | `light`,`dark`                                                                                            | `light`   |
