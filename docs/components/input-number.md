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
  <y-input-number
    v-model="num"
    controls
    controls-position="right"
  ></y-input-number>
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

### Input-number Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ------ | ------ |
| value/v-model| 绑定值| number | ——| 0|
| min | 设置计数器允许的最小值 | number | ——| -Infinity |
| max | 设置计数器允许的最大值 | number | ——| Infinity |
| step | 计数器步长 | number | ——| 1 |
| step-strictly | 是否只能输入step的倍数 | boolean | ——| false |
| precision | 数值精度 | number | ——| —— |
| size | 计数器尺寸 | string | large,small| —— |
| disabled | 是否禁用计数器 | boolean | ——| false |
| controls | 是否使用控制按钮 | boolean | ——| false |
| controls-position | 是否使用控制按钮 | boolean | ——| false |

