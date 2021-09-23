## InputNumber 数据输入框

### 基本用法
:::demo
```html
<template>
  <y-input-number v-model="num"></y-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: ''
      }
    }
  }
</script>
```
:::
### 禁用状态
:::demo
```html
<template>
  <y-input-number v-model="num" disabled></y-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: ''
      }
    }
  }
</script>
```
:::
### 显示控制按钮
:::demo
```html
<template>
  <y-input-number v-model="num" controls></y-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: ''
      }
    }
  }
</script>
```
:::
### 按钮位置
:::demo
```html
<template>
  <y-input-number v-model="num" controls controls-position="right"></y-input-number>
</template>
<script>
  export default {
    data() {
      return {
        num: ''
      }
    }
  }
</script>
```
:::
