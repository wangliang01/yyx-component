<template>
  <div class="image-wrapper" :style="{width: `${width}px`, height: `${width}px`}">
    <el-image :src="src" :fit="fit" lazy :style="{width: `${width}px`, height: `${width}px`}">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <!-- 预览，查看放大图按钮 -->
    <div v-if="isPreview" class="mask">
      <i class="el-icon-zoom-in icon" @click="visible=!visible"></i>
    </div>
    <!-- 图片预览插件 -->
    <y-image-viewer v-if="isPreview" :visible.sync="visible" :url-list="[src]"></y-image-viewer>
  </div>
</template>

<script>
export default {
  name: 'YImage',
  components: {
  },
  props: {
    src: {
      type: String,
      required: true
    },
    fit: {
      type: String,
      default: 'cover'
    },
    width: {
      type: [String, Number],
      default: 104
    },
    isPreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.image-wrapper{
  position: relative;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  overflow: hidden;
  &:hover .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .3);
    &:hover {
      .icon{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 20px;
        color: #fff;
        cursor: pointer;
      }
    }
  }

}
</style>
