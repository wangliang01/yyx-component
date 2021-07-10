<template>
  <div class="image-list">
    <y-image v-for="(url, index) in urlList" :key="index" :url-list="urlList" :src="url" class="image-item"></y-image>
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
    }
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
.image-list {
  display: flex;
  .image-item {
    flex: 0 0 auto;
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
