<template>
  <div ref="imageList" class="image-list">
    <y-image v-for="(url, index) in urlList" :key="index" :url-list="urlList" :src="url" class="image-item" v-bind="$attrs"></y-image>
  </div>
</template>

<script>
export default {
  name: 'YImageList',
  components: {
  },
  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    offset: {
      type: [String, Number],
      default: 16
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const imageItems = [...this.$refs.imageList.querySelectorAll('.image-item')]
      imageItems.slice(0, imageItems.length - 1).forEach(item => {
        item.style.marginRight = `${this.offset}px`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-list {
  display: flex;
  .image-item {
    flex: 0 0 auto;
  }
}
</style>
