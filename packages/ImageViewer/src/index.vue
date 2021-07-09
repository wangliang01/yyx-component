<template>
  <ImageViewer v-show="visible" v-bind="$attrs" :on-close="haneleHide" :url-list="urlList" v-on="$listeners"></ImageViewer>
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
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    haneleHide() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
