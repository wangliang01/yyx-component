# y-collapse 折叠

折叠组件主要用来展示详情信息。

## 基本用法

仅有2个props`title`和`height`，传入其中随便其中1个或2个即可渲染一个 y-collapse。
可以传入 slot。

### 2个参数的情况
::: demo
```html
<template>
  <y-collapse title="y-collapse" :height="120">
    <div style="height:400px;">
      hello world
    </div>
  </y-collapse>
</template>
<script>
  export default {}
</script>
```
:::

### 1个height参数的情况
::: demo
```html
<template>
  <y-collapse :height="120">
    <div style="height:400px;">
      hello world
    </div>
  </y-collapse>
</template>
<script>
  export default {}
</script>
```
:::

### 1个title参数的情况
::: demo
```html
<template>
  <y-collapse title="y-collapse">
    <div style="height:400px;">
      hello world
    </div>
  </y-collapse>
</template>
<script>
  export default {}
</script>
```
:::