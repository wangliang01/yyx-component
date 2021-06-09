<template>
  <div class="print">
    <el-button
      :type="$attrs.type || 'text'"
      :size="$attrs.size || 'mini'"
      v-bind="$attrs"
      @click="handlePrint"
    >{{ text }}</el-button>
    <div
      :ref="ref"
      class="print-content"
    >
      <!-- 打印内容 -->
      <slot
        v-if="showPrintContent"
        :res="res"
      >打印内容</slot>
    </div>
  </div>
</template>

<script>
import Browser from '../../utils/browser'
import Print from './print'
import { cloneElement } from './fn'
export default {
  name: 'YPrint',
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
      default: ''
    },
    printStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    const ref = Math.random().toString(36).replace('.', '')
    return {
      ref,
      res: {},
      showPrintContent: false, // 显示打印内容
      isPrinting: false
    }
  },
  methods: {
    async handlePrint() {
      // 如果正在打印，则取消打印
      if (this.isPrinting) return
      this.isPrinting = true
      // 显示打印内容
      this.showPrintContent = true
      if (this.api instanceof Function) {
        // 获取打印数据
        this.res = await this.api()
      }

      this.$nextTick(() => {
        // 打印参数
        const params = {
          printable: null,
          fallbackPrintable: null,
          type: 'html',
          header: null,
          headerStyle: 'font-weight: 300;',
          maxWidth: 800,
          properties: null,
          gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
          gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
          showModal: false,
          onError: (error) => { throw error },
          onLoadingStart: null,
          onLoadingEnd: null,
          onPrintDialogClose: () => {},
          onIncompatibleBrowser: () => {},
          modalMessage: 'Retrieving Document...',
          frameId: 'printJS',
          printableElement: null,
          documentTitle: 'Document',
          targetStyle: ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height'],
          targetStyles: ['border', 'box', 'break', 'text-decoration'],
          ignoreElements: [],
          repeatTableHeader: true,
          css: null,
          style: null,
          scanStyles: true,
          base64: false,

          // Deprecated
          onPdfOpen: null,
          font: 'TimesNewRoman',
          font_size: '12pt',
          honorMarginPadding: true,
          honorColor: false,
          imageStyle: 'max-width: 100%;'
        }
        // 获取打印的html内容
        const printElement = this.$refs[this.ref]
        // To prevent duplication and issues, remove any used printFrame from the DOM
        const usedFrame = document.getElementById(params.frameId)

        if (usedFrame) usedFrame.parentNode.removeChild(usedFrame)
        // 创建一个iframe
        const printFrame = document.createElement('iframe')

        params.printableElement = cloneElement(printElement, params)

        console.log('printableElement', params.printableElement)

        if (Browser.isFirefox()) {
          // Set the iframe to be is visible on the page (guaranteed by fixed position) but hidden using opacity 0, because
          // this works in Firefox. The height needs to be sufficient for some part of the document other than the PDF
          // viewer's toolbar to be visible in the page
          printFrame.setAttribute('style', 'width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; margin: 0; padding: 0')
        } else {
          // Hide the iframe in other browsers
          printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute; border: 0')
        }

        // Set iframe element id
        printFrame.setAttribute('id', params.frameId)

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
                margin: 0 auto;
                text-align: center;
                border-color: #000 !important;
                color: #000 !important;
                border-spacing: 0;
                border-collapse: ${Browser.isChrome() ? 'collapse' : 'unset'};
                -moz-border-top: #000 2px solid;
                -moz-border-right: #000 1px solid;
                border: #000 1px solid;
                
              }
              table td,
              table th {
                -moz-border-left: #000 1px solid;
	              -moz-border-bottom: #000 1px solid;
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
          <body id="printFrame">
            ${printElement.innerHTML}
          </body>
        </html>`

        printFrame.srcdoc = html

        Print.send(params, printFrame)

        setTimeout(() => {
          if (printFrame) {
            document.getElementsByTagName('body')[0].removeChild(printFrame)
            this.showPrintContent = false
            this.isPrinting = false
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.print {
  display: inline-block;
}
.print-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;
}
</style>
