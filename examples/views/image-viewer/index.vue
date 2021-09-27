<template>
  <el-card>
    <ImageViewer></ImageViewer>
  </el-card>
</template>

<script>
import ImageViewer from '../../../docs/components/image-viewer.md'
export default {
  name: '',
  components: {
    ImageViewer
  },
  data() {
    return {
      urlList: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'],
      visible: true
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
