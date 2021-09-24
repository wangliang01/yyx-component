## Container 容器

### 基本用法

::: demo

```html
<template>
  <y-container></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 边框样式

::: demo

```html
<template>
  <y-container borderType="dashed"></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 边框颜色

::: demo

```html
<template>
  <y-container borderColor="#f00"></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 边框宽度

::: demo

```html
<template>
  <y-container borderWidth="2"></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 背景

::: demo

```html
<template>
  <y-container
    background="linear-gradient(270deg, #FFFFFF 0%, #FFF0EE 100%);"
  ></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 圆角

::: demo

```html
<template>
  <y-container borderRadius="30"></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 宽度，高度

::: demo

```html
<template>
  <y-container width="300px" height="200px"></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### 是否显示阴影

::: demo

```html
<template>
  <y-container width="300px" height="200px" :shadow="false"></y-container>
</template>
<script>
  export default {}
</script>
```

:::

### Attributes

| 参数         | 说明         | 类型           | 可选值                             | 默认值  |
| ------------ | ------------ | -------------- | ---------------------------------- | ------- |
| borderType   | 边框类型     | String         | solid, dashed                      | solid   |
| borderColor  | 边框颜色     | String         | ——                                 | #D9D9D9 |
| borderWidth  | 边框宽度     | String,Number  | ——                                 | 1       |
| background   | 背景         | String         | ——                                 | #FFFFFF |
| borderRadius | 圆角         | String, Number | ——                                 | 4       |
| width        | 容器宽度     | String         | 百分比，或者带 px 的数值，如 300px | 100%    |
| height       | 容器高度     | String         | 百分比，或者带 px 的数值，如 300px | 100%    |
| shadow       | 是否显示阴影 | Boolean        | ——                                 | true    |
