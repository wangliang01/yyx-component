## Input 输入框

当输入框，需要输入限制时，如限制只能输入整数，或者只能输入两位小数的浮点数时，`y-input`就可以派上用场了。

### 普通输入框

不作任何限制，跟 el-input 等效。
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

### number 类型输入框

限制输入浮点数，如果不限制小数位数，默认限制 2 位小数。
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

### integer 类型输入框

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

### integer-digit 控制整数位数

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

### precision 控制小数位数

限制输入小数部分的位数。
::: demo

```html
<template>
  <y-input v-model="value" number precision="4"></y-input>
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

### max 控制最大值

限制输入的最大值。
::: demo

```html
<template>
  <y-input v-model="value" number max="100"></y-input>
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

### min 控制最小值

限制输入的最小值。
::: demo

```html
<template>
  <y-input v-model="value" number min="1"></y-input>
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

### Input Attributes

| 参数            | 说明                                                                                  | 类型             | 可选值                                     | 默认值 |
| --------------- | ------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------ | ------ |
| type            | 类型                                                                                  | string           | text, textarea,和其他原生 input 的 type 值 | text   |
| value/v-model   | 绑定值                                                                                | string/number    | ——                                         | ——     |
| number          | 只能输入浮点数                                                                        | boolean          | ——                                         | false  |
| integer         | 只能输入整数                                                                          | boolean          | ——                                         | false  |
| integerDigit    | 可输入整数位数                                                                        | string/number    | ——                                         | ——     |
| precision       | 可输入小数位数                                                                        | string/number    | ——                                         | 2      |
| negative        | 可输入负数                                                                            | boolean          | ——                                         | false  |
| unit            | 可输入单位                                                                            | string           | ——                                         | ——     |
| maxlength       | 原生属性，最大输入长度                                                                | number           | ——                                         | ——     |
| minlength       | 原生属性，最小输入长度                                                                | number           | ——                                         | ——     |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效                  | boolean          | ——                                         | false  |
| placeholder     | 输入框占位文本                                                                        | string           | ——                                         | ——     |
| clearable       | 是否可清空                                                                            | boolean          | ——                                         | false  |
| show-password   | 是否显示切换密码图标                                                                  | boolean          | ——                                         | false  |
| disabled        | 禁用                                                                                  | boolean          | ——                                         | false  |
| size            | 输入框尺寸，只在 type!="textarea" 时有效                                              | string           | medium / small / mini                      | ——     |
| prefix-icon     | 输入框头部图标                                                                        | string           | ——                                         | ——     |
| suffix-icon     | 输入框尾部图标                                                                        | string           | ——                                         | ——     |
| rows            | 输入框行数，只对 type="textarea" 有效                                                 | boolean / object | ——                                         | 2      |
| autosize        | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean/ object  | ——                                         | false  |
| autocomplete    | 原生属性，自动补全                                                                    | string           | on,off                                     | off    |
| name            | 原生属性                                                                              | string           | ——                                         | ——     |
| readonly        | 原生属性，是否只读                                                                    | boolean          | ——                                         | false  |
| max             | 原生属性，设置最大值                                                                  | ——               | ——                                         | ——     |
| min             | 原生属性，设置最小值                                                                  | ——               | ——                                         | ——     |
| step            | 原生属性，设置输入字段的合法数字间隔                                                  | ——               | ——                                         | ——     |
| resize          | 控制是否能被用户缩放                                                                  | string           | none, both, horizontal, vertical           | ——     |
| autofocus       | 原生属性，自动获取焦点                                                                | boolean          | true,false                                 | false  |
| form            | 原生属性                                                                              | string           | ——                                         | ——     |
| label           | 输入框关联的 label 文字                                                               | string           | ——                                         | ——     |
| tabindex        | 输入框的 tabindex                                                                     | string           | ——                                         | ——     |
| validate-event  | 输入时是否触发表单的校验                                                              | boolean          | ——                                         | true   |
