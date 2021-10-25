<template>
  <iframe ref="iframeRef" :src="url" width="100%" frameborder="0" :height="height"></iframe>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  name: 'YDataBoard',
  components: {
  },
  props: {
    api: {
      type: Function,
      required: true
    },
    url: {
      type: String,
      default: 'https://data-cube.yunlizhi.cn/#/workbooks/board/preview/dashboard/web/211?appId=shangliu&mapping=50175660bcf1cf86f6664ea214edce39687210a3e73761e47323cb3c185d13e0'
    },
    frameHeight: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      appId: 'shangliu',
      privateKey: 'FyJMeLn2Sg3mo5q3QSsB3H3SPc7yslrZ'
    }
  },
  computed: {
    height() {
      return (this.frameHeight ? this.frameHeight : window.document.documentElement.scrollHeight) + 'px'
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage, false)
    this.fixedHeight()
  },
  methods: {
    handleMessage(event) {
      var data = event.data
      if (data.params) {
        const { key, base64Params, dashboardId, callbackId } = data.params
        switch (data.cmd) {
          case 'noticeTransferKey':
            // 处理业务逻辑
            this.getEncryptionParamsData(key, base64Params, dashboardId, callbackId)
            break
        }
      }
    },
    sendMessage(key, token, timestamp, dashboardId, callbackId) {
      if (this.$refs.iframeRef) {
        const iframeWin = this.$refs.iframeRef.contentWindow
        iframeWin.postMessage(
          {
            cmd: 'sendTransferNewKey',
            params: { key, token, timestamp, dashboardId, callbackId }
          },
          '*'
        )
      }
    },
    async getEncryptionParamsData(key, base64Params, dashboardId, callbackId) {
      let token = CryptoJS.MD5(this.appId + timestamp + this.privateKey + base64Params).toString()
      let timestamp = Date.parse(new Date())
      if (typeof this.api === 'function') {
        const res = await this.api()
        if (res.success) {
          token = res.token
          timestamp = res.timestamp
        }
      }
      if (callbackId) {
        this.sendMessage(key, token, timestamp, dashboardId, callbackId)
      } else {
        this.sendMessage(key, token, timestamp, dashboardId)
      }
    },
    fixedHeight() {
      const iframe = this.$refs.iframeRef
      var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow
      if (iframeWin.document.body) {
        iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
