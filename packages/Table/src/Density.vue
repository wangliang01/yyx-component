<template>
  <!-- 密度按钮 -->
  <el-tooltip effect="dark" content="密度" placement="top">
    <el-popover placement="bottom" width="100" trigger="click">
      <i
        slot="reference"
        ref="reference"
        class="iconfont icon-shoujinhang"
      >
      </i>
      <!-- 展示列表 -->
      <div class="list">
        <div
          v-for="(item, index) in densityConfig"
          :key="item.value"
          class="item"
          :class="{ active: activeIndex === index }"
          @click="handleSetTableSize(item.value, index)"
        >
          {{ item.label }}
        </div>
      </div>
    </el-popover>
  </el-tooltip>
</template>

<script>
import { densityConfig } from './config'
export default {
  name: 'Desity',
  components: {},
  props: {
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      densityConfig,
      activeIndex: densityConfig.findIndex(item => item.value === this.size)
    }
  },
  mounted() {},
  methods: {
    handleSetTableSize(size, index) {
      this.activeIndex = index
      const reference = this.$refs.reference
      this.$emit('resize', {
        size,
        close() {
          reference && reference.click()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  color: #8C8C8C;
}

.el-popover {
  padding: 0 !important;
  .list .item {
    padding: 5px 12px;
    line-height: 22px;
    cursor: pointer;
    &.active {
      color: #1890ff;
    }
    &:hover {
      background: #e6f7ff;
    }
  }
}
</style>
