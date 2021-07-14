# Text 文本

## 基本用法

当文本超长时，显示省略号，鼠标悬浮时，显示 tooltip，当文本正常时，则正常显示。

```js {2}
<template>
  <y-text content="床前明月光，疑是地上霜" style="width: 100px;"></y-text>
</template>
```

::: demo

```html
<template>
  <y-text content="床前明月光，疑是地上霜" style="width: 100px;"></y-text>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## 多行显示

如果想多行显示，可以设置`line`来控制。

```js {2-6}
<template>
  <y-text
    content="床前明月光，疑是地上霜"
    style="width: 80px;"
    line="2"
  ></y-text>
</template>
```

::: demo

```html
<template>
  <y-text
    content="床前明月光，疑是地上霜"
    style="width: 80px;"
    line="2"
  ></y-text>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## Text Attrubites

| 名称    | 说明     | 类型          | 可选值 | 默认值 |
| ------- | -------- | ------------- | ------ | ------ | -------- |
| content | 文本内容 | string        | number | -      | 暂无数据 |
| line    | 行数     | string/number | -      | 1      |

