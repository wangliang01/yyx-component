<template>
  <div class="print">
    <el-button
      :type="$attrs.type || 'text'"
      :size="$attrs.size || 'mini'"
      v-bind="$attrs"
      @click="handlePrint"
    >{{ text }}</el-button>
    <div :ref="ref" class="print-content">
      <!-- 打印内容 -->
      <slot v-if="showPrintContent" :res="res">打印内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YPrint',
  components: {
  },
  props: {
    api: {
      type: Function,
      required: true
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
      ref: Math.random().toString(36).replace('.', ''),
      res: {},
      showPrintContent: false // 显示打印内容
    }
  },
  methods: {
    async handlePrint() {
      if (this.api instanceof Function) {
        this.res = await this.api()
      }
      // 显示打印内容
      console.log('res', this.res)
      this.showPrintContent = true
      const isChrome = window.navigator.userAgent.includes('Chrome')

      if (!isChrome) {
        return this.$message.warning('该浏览器暂不支持打印功能，建议使用最新的chrome浏览器再试')
      }
      this.$nextTick(() => {
        const printDom = this.$refs[this.ref]
        const printFrame = document.createElement('iframe')
        printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;')
        const html = `<html>
          <head>
            <meta http-equiv=content-type content="text/html; charset=utf-8">
            <link rel="stylesheet" href="${this.css ? this.css : ''}">
            <style>
              @page { margin: 0; }
              * {
                margin: 0;
                padding: 0;
              }
              table {
                border-collapse: collapse;
                margin: 0 auto;
                text-align: center;
                border-color: #000 !important;
                color: #000 !important;
              }
              table td,
              table th {
                border: 1px solid #000;
                color: #000 !important;
                height: 30px;
              }
              table thead th {
                background-color: #cce8eb;
                width: 100px;
              }
              table tr:nth-child(odd) {
                background: #fff;
              }
              table tr:nth-child(even) {
                background: #fff;
              }
            </style>
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
          this.showPrintContent = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.print{
  display: inline-block;
}
.print-content {
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
