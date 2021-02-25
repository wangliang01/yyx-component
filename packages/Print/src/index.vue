<template>
  <div class="print">
    <el-button type="text" @click="handlePrint">打印</el-button>
    <div class="print-content">
      <!-- 打印内容 -->
      <slot>打印内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YPrint',
  components: {
  },
  props: {
    css: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    handlePrint() {
      const printDom = document.querySelector('.print-content')
      const printFrame = document.createElement('iframe')
      printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;')
      const html = `<html>
        <head>
          <link href="${this.css ? this.css : ''}" rel="stylesheet">
        </head>
        <body>
          ${printDom.innerHTML}
        </body>
      </html>`

      printFrame.srcdoc = html
      document.getElementsByTagName('body')[0].appendChild(printFrame)
      console.log(html)
      printFrame.contentWindow.print()
    }
  }
}
</script>

<style lang="scss" scoped>
.print-content{
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
