<template>
  <div>
    <y-image :src="src"></y-image>
    <el-card>
      <ImageMd class="md"></ImageMd>
    </el-card>
  </div>
</template>

<script>
import ImageMd from '../../../docs/components/image.md'
export default {
  name: '',
  components: {
    ImageMd
  },
  props: {

  },
  data() {
    return {
      src: 'https://1fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted() {
    console.log('mounted')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
