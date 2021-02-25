<template>
  <div class="print">
    <el-button
      :type="type"
      @click="handlePrint"
    >{{ text }}</el-button>
    <div :ref="ref" class="print-content">
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
    type: {
      type: String,
      default: 'text'
    },
    text: {
      type: String,
      default: '打印'
    },
    css: {
      type: String,
      default: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    },
    printStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ref: Math.random().toString(36).replace('.', '')
    }
  },
  mounted() {

  },
  methods: {
    handlePrint() {
      const printDom = this.$refs[this.ref]
      const printFrame = document.createElement('iframe')
      printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;')
      const html = `<html>
        <head>
          <meta http-equiv=content-type content="text/html; charset=utf-8">
          <!--引入外部样式 -->
          <link href="${this.css ? this.css : ''}" rel="stylesheet" >
          <style>
            @page { margin: 0; } // 去掉页眉页脚
          </style>
          <!--引入内部样式 -->
          <style>
            ${this.printStyle ? this.printStyle : ''}
          </style>
        </head>
        <body>
          ${printDom.innerHTML}
        </body>
      </html>`

      printFrame.srcdoc = html
      document.getElementsByTagName('body')[0].appendChild(printFrame)
      printFrame.contentWindow.print()
      setTimeout(() => {
        document.getElementsByTagName('body')[0].removeChild(printFrame)
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.print-content {
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
