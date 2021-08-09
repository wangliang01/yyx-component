<template>
  <div class="audit-form">
    <y-audit-form v-model="form" :config="config" label-width="120px" label-suffix="："></y-audit-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      form: {},
      config: {
        auditResult: {
          label: '审核结果',
          prop: 'auditResult',
          fieldType: 'Radio',
          options: [
            {
              label: '通过',
              value: '1',
              cols: 12
            },
            {
              label: '未通过',
              value: '0',
              cols: 12
            }
          ]
        },
        auditComponent: {
          label: '审核结果',
          prop: 'auditComponent',
          fieldType: 'Input',
          type: 'textarea'
        }
      }
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
