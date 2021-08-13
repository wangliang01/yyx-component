<template>
  <y-form v-model="form" :config="config" v-bind="$attrs" v-on="$listeners">
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </y-form>
</template>

<script>
/* eslint-disable */
export default {
  name: 'YAuditForm',
  components: {
  },
  props: {
    value: {
      type: Object
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
    }
  },
  watch: {
    value: {
      handler(val) {
        this.form = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
