<template>
  <div class="upload">
    <el-card>
      <UploadMd class="md"></UploadMd>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
    UploadMd: () => import('../../../docs/components/upload.md')
  },
  props: {

  },
  data() {
    return {

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
