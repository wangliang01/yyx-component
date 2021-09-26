## Text 文本

当文本超长时，显示省略号，鼠标悬浮时，显示 tooltip，当文本正常时，则正常显示。
### 基本用法

`content`代表显示的内容

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

### 多行显示

如果想多行显示，可以设置`line`来控制。

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

### 显示小圆点

如果想要显示小圆点，可以设置`dot`来控制，并且配合`type`来控制小圆点的类型

::: demo

```html
<template>
 <div>
   <div>
      <y-text
        content="床前明月光，疑是地上霜"
        style="width: 100px;"
        :dot="true"
        ></y-text>
   </div>
  <div>
     <y-text
     content="床前明月光，疑是地上霜"
     style="width: 200px;"
     :dot="true"
     type="warning"
    ></y-text>
  </div>
  <div>
     <y-text
     style="width: 200px;"
     :dot="true"
     type="success"
    >床前明月光，疑是地上霜</y-text>
  </div>
 </div>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::


### Text Attrubites

| 参数            | 说明                                                                                  | 类型             | 可选值                                     | 默认值 |
| --------------  | ------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------ | ------ |
| content         | 展示的文本内容                                                                         | string/number/boolean/object/array| ——                           | —— |           
| line            | 如果想多行显示，可以设置`line`来控制                                                     | string/number    |  ——                                           | 1 |
| dot             | 显示小圆点                                                                             | boolean           | false/true                                 | false |  
| type            | 小圆点的类型                                                                           | string            | primary / success / warning / danger / info / text | primary |



### Text Slot
| name           | 说明                                                                                        |
| --------------  | ------------------------------------------------------------------------------------------ |
| ——              | 当且仅当我们不传content时，我们可以下标签中插入内容                                            |