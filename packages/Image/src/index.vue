<template>
  <div
    class="image-wrapper"
  >
    <el-image
      :src="src"
      :fit="fit"
      lazy
      :style="{width: `${width}px`, height: `${width}px`}"
    >
      <div
        slot="error"
        class="image-slot"
      >
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <!-- 预览，查看放大图按钮 -->
    <div
      v-if="isPreview"
      class="mask"
    >
      <i
        class="el-icon-zoom-in icon"
        @click="visible=!visible"
      ></i>
    </div>
    <!-- 图片预览插件 -->
    <y-image-viewer
      v-if="isPreview"
      :visible.sync="visible"
      :url-list="isEmpty ? [src] : curUrlList()"
    ></y-image-viewer>
  </div>
</template>

<script>
import { clone, findIndex } from 'lodash'
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
    },
    urlList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    isEmpty() {
      return this.urlList.length === 0
    }

  },
  mounted() {

  },
  methods: {
    curUrlList() {
      const copyUrlList = clone(this.urlList)
      const index = findIndex(this.urlList, url => { return url === this.src })

      return [...copyUrlList.slice(index), ...copyUrlList.slice(0, index)]
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
  font-size: 0;
  overflow: hidden;
  border-radius: 4px;
  ::v-deep .el-image {
    outline: 1px solid #d9d9d9;
    border-radius: 4px;
  }
  &:hover .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    &:hover {
      .icon {
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
