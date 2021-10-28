<template>
  <div ref="container" class="container">
    <div ref="slotContent" class="slot-content">
      <slot></slot>
    </div>
    <!-- <iframe ref="iframeRef" :src="url" width="100%" height="100%" frameborder="0"></iframe> -->
  </div>
</template>

<script>
// import CryptoJS from 'crypto-js'
export default {
  name: 'YDataBoard',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    url: {
      type: String,
      default: 'https://data-cube.yunlizhi.cn/#/workbooks/board/preview/dashboard/web/299?appId=shangliu&mapping=161ed2fee293f3b92e7aec01007cd4e5872ee2bd7943ccfc51a7f875f93f354c9c5ef6ee6287a77cbb9cc722b0e041c9'
    },
    api: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      dashboardData: {},
      iframeRef: null,
      queryParams: {
        tenantId: null,
        orgId: null
      }
    }
  },
  watch: {
    url(val) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.removeIframe()
      this.createIframe()
      const res = await this.api(this.params)
      if (res.success) {
        this.dashboardData = res.data
        window.addEventListener('message', this.handleMessage, false)
      }
    },
    createIframe() {
      const el = this.$refs.container
      const iframe = document.createElement('iframe')
      iframe.width = '100%'
      iframe.height = '100%'
      iframe.src = this.url
      this.iframeRef = iframe
      el.appendChild(iframe)
    },
    removeIframe() {
      const el = this.$refs.container
      if (this.iframeRef) {
        el.removeChild(this.iframeRef)
        this.iframeRef = null
      }
    },
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
      if (this.iframeRef) {
        const iframeWin = this.iframeRef.contentWindow

        console.log(token)
        iframeWin.postMessage(
          {
            cmd: 'sendTransferNewKey',
            params: { key, token, timestamp, dashboardId, callbackId: callbackId }
          },
          '*'
        )
      }
    },
    getEncryptionParamsData(key, base64Param, dashboardId, callbackId) {
      if (this.dashboardData) {
        // const timestamp = Date.parse(new Date())
        // const appId = this.dashboardData.appId
        // const privateKey = this.dashboardData.privateKey
        // base64Param = this.dashboardData.base64Param || ''
        const timestamp = this.dashboardData.timestamp
        const token = this.dashboardData.token
        // console.log("后端返回token", token);
        // console.log("前端生成token", CryptoJS.MD5(appId + timestamp + privateKey + base64Param).toString())
        // const token = CryptoJS.MD5(appId + timestamp + privateKey + base64Param).toString()

        if (callbackId) {
          this.sendMessage(key, token, timestamp, dashboardId, callbackId)
        } else {
          this.sendMessage(key, token, timestamp, dashboardId)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  width: 100%;
  height: 1250px;
  overflow: hidden;
}
</style>
