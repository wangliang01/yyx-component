## Tag 标签

用于标记和选择。

### 基础用法

由type属性来选择tag的类型，也可以通过color属性来自定义背景色。

::: demo

```html
<template>
  <el-card>
    <y-tag >标签一</y-tag>
    <y-tag color="#ecf5ff">标签二</y-tag>
    <y-tag type="success">标签三</y-tag>
    <y-tag type="info">标签四</y-tag>
    <y-tag type="warning">标签五</y-tag>
    <y-tag type="danger">标签六</y-tag>
  </el-card>  
</template>
<script>
  export default {}
</script>
<style></style>
```
:::


### 可移除标签

设置closable属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置disable-transitions属性，它接受一个Boolean，true 为关闭

::: demo

```html
<template>
  <el-card>
    <y-tag closable >标签一</y-tag>
    <y-tag closable color="#ecf5ff">标签二</y-tag>
    <y-tag closable type="success">标签三</y-tag>
    <y-tag closable type="info">标签四</y-tag>
    <y-tag closable type="warning">标签五</y-tag>
    <y-tag closable type="danger">标签六</y-tag>
  </el-card>  
</template>
<script>
  export default {
   
  }
</script>
<style></style>
```

:::

### 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现

::: demo

```html
<template>
  <el-card>
    <y-tag
     :key="index"
     v-for="(tag,index) in dynamicTags"
     closable
     color="#ecf5ff"
     :disable-transitions="false"
     @close="handleClose(tag)">
     {{tag}}
    </y-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </el-card>  
</template>
<script>
  export default {
     data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>
<style>
   .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
```

:::

### Tag Attrubites

| 参数            | 说明                                                                                  | 类型             | 可选值                                     | 默认值 |
| --------------  | ------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------ | ------ |
| type            |  类型                                                                                 | string           | success/info/warning/danger                | ——    |
| closable        |  是否可关闭                                                                            | boolean          | ——                                         | false | 
| disable-transitions |  是否禁用渐变动画                                                                   | boolean          | ——                                         | false | 
| hit             |  是否有边框描边                                                                         | boolean          | ——                                         | false | 
| color            |  背景色                                                                               | string          | ——                                          | —— | 
| size             |  尺寸                                                                                  | string          | medium / small / mini                         | —— | 
| effect           |  主题                                                                                | string          | dark / light / plain                          | light | 


### Tag Events

| 事件名          |  说明                                                           | 回调参数        |
| ----------------|---------------------------------------------------------------  | -------------- |
| click           | 点击 Tag 时触发的事件                                             | ——             |
| close           | 关闭 Tag 时触发的事件                                             | ——             |

