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

### Attributes

| 参数              | 说明                     | 类型    | 可选值      | 默认值    |
| ----------------- | ------------------------ | ------- | ----------- | --------- |
| value/v-model     | 绑定值                   | number  | ——          | 0         |
| min               | 设置计数器允许的最小值   | number  | ——          | -Infinity |
| max               | 设置计数器允许的最大值   | number  | ——          | Infinity  |
| step              | 计数器步长               | number  | ——          | 1         |
| step-strictly     | 是否只能输入 step 的倍数 | boolean | ——          | false     |
| precision         | 数值精度                 | number  | ——          | ——        |
| size              | 计数器尺寸               | string  | large,small | ——        |
| disabled          | 是否禁用计数器           | boolean | ——          | false     |
| controls          | 是否使用控制按钮         | boolean | ——          | false     |
| controls-position | 是否使用控制按钮         | boolean | ——          | false     |
| name              | 原生属性                 | string  | ——          | ——        |
| label             | 输入框关联的 label 文字  | string  | ——          | ——        |
| placeholder       | 输入框默认 placeholder   | string  | ——          | ——        |

### Events

| 事件名称 | 说明                        | 回调参数               |
| -------- | --------------------------- | ---------------------- |
| change   | 绑定值改变时触发            | currentValue, oldValue |
| blur     | 在组件 Input 失去焦点时触发 | (event: Event)         |
| focus    | 在组件 Input 获取焦点时触发 | (event: Event)         |

### Methods

| 方法名 | 说明                | 参数 |
| ------ | ------------------- | ---- |
| focus  | 使 input 获取焦点   | ——   |
| select | 选中 input 中的文字 | ——   |
