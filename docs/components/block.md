# Block 区块

## 基础用法

:tada: :100: 用来布局一些常见的样式。

::: demo

```html
<template>
  <div>
    <y-block title="SPU 信息"> 这里是SPU详情信息 </y-block>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped lang="scss"></style>
```

:::

<style lang="">
</style>

## Block Attributes

| 名称  | 说明 | 类型   | 可选值 | 默认值 |
| ----- | ---- | ------ | ------ | ------ |
| title | 标题 | string | -      | -      |

## Block Slot

| 名称               | 说明                   |
| ------------------ | ---------------------- |
| ——                 | 自定义区块内容         |
| block-header-right | 自定义区块顶部右侧内容 |
| block-footer       | 自定义区块底部内容     |
