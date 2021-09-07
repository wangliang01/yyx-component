## 我是一段文字

Hello World

:::demo

```html
<template>
  <div>
    测试 md 内置组件 -- <span class="text">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello World !!!",
    };
  },
};
</script>
<style scoped>
.text {
  color: #f00;
}
</style>
:::
