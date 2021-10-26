<template>
  <el-card>
    <y-data-board :api="api"></y-data-board>
  </el-card>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    async api() {
      return {
        'code': '200', 'success': true, 'data': { 'appId': 'shangliu', 'token': 'ac262600978769daa9049b3cb9d4b7d1', 'ts': '1635150513670', 'base64Param': 'dGVuYW50SWQ9MyZvcmdJZD0xNQ==' }, 'msg': '操作成功'
      }
    }
  }
}
</script>
