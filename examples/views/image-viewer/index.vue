<template>
  <div>
    <y-image-viewer :url-list="urlList" :visible.sync="visible"></y-image-viewer>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
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
