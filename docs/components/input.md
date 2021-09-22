## Input 输入框
当输入框，需要输入限制时，如限制只能输入整数，或者只能输入两位小数的浮点数时，`y-input`就可以派上用场了。

### 普通输入框
不作任何限制，跟el-input等效。
::: demo
```html
<template>
  <y-input v-model="value"></y-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### number类型输入框
限制输入浮点数，如果不限制小数位数，默认限制2位小数。
::: demo
```html
<template>
  <y-input v-model="value" number></y-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### integer类型输入框
限制输入整数。
::: demo
```html
<template>
  <y-input v-model="value" integer></y-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### integer-digit控制整数位数
限制输入整数部分的位数。
::: demo
```html
<template>
  <y-input v-model="value" number integer-digit="2"></y-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### precision控制小数位数
限制输入小数部分的位数。
::: demo
```html
<template>
  <y-input v-model="value" number  precision="4"></y-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### max控制最大值
限制输入的最大值。
::: demo
```html
<template>
  <y-input v-model="value" number  max="100"></y-input>
</template>
<script>

export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### min控制最小值
限制输入的最小值。
::: demo
```html
<template>
  <y-input v-model="value" number  min="1"></y-input>
</template>
<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```
:::