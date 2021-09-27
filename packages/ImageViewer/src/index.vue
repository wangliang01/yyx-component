<template>
  <ImageViewer v-show="visible" v-bind="$attrs" :on-close="handleHide" :url-list="urlList" v-on="$listeners"></ImageViewer>
</template>

<script>
import ImageViewer from 'element-ui/packages/image/src/image-viewer.vue'
export default {
  name: 'YImageViewer',
  components: {
    ImageViewer
  },
  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleHide() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
