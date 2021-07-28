<template>
  <!-- 设置 -->
  <el-tooltip effect="dark" content="设置" placement="top">
    <el-popover placement="bottom" width="200" trigger="click">
      <i slot="reference" class="iconfont icon-bianji"></i>
      <!-- 展示列表 -->
      <div class="list">
        <!-- 列表头 -->
        <div class="list-header">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="indeterminate"
            @change="handleCheckAllChange"
          >列展示</el-checkbox>
          <el-button type="text" @click="handleReset">重置</el-button>
        </div>
        <Draggable
          v-model="settingConfig"
          draggable=".item"
          :group="{ name: 'prop', pull: 'clone', put: false }"
          @start="drag = true"
          @end="handleDragEnd"
        >
          <div
            v-for="(item, index) in settingConfig"
            :key="item.value"
            class="item"
            :class="{ active: activeIndex === index }"
          >
            <el-checkbox v-model="item.checked" @change="handleCheckChange">
              {{ item.label }}
            </el-checkbox>
            <div class="btn-wrapper">
              <el-tooltip effect="dark" content="固定在列首" placement="top">
                <i
                  class="icon el-icon-upload2"
                  @click="handleFixedLeft(item)"
                ></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="固定在列尾" placement="top">
                <i
                  class="icon el-icon-download"
                  @click="handleFixedRight(item)"
                ></i>
              </el-tooltip>
            </div>
          </div>
        </Draggable>
      </div>
    </el-popover>
  </el-tooltip>
</template>

<script>
import { cloneDeep } from 'lodash'
import Draggable from 'vuedraggable'
export default {
  name: 'Setting',
  components: {
    Draggable
  },
  model: {
    prop: 'columns',
    event: 'column-change'
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    originColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      settingConfig: [],
      checkAll: true,
      drag: false,
      indeterminate: false,
      activeIndex: 0
    }
  },
  watch: {
    columns: {
      handler() {
        // 如果在拖拽时，不走initConfig
        if (this.drag) return
        this.initConfig()
      },
      deep: true,
      immediate: true
    },
    originColumns: {
      handler() {
        // 如果在拖拽时，不走initConfig
        if (this.drag) return
        this.initConfig()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /* 固定到左侧 */
    handleFixedLeft(item) {
      this.$set(item, 'fixed', 'left')
      this.forceUpdate()
    },
    /* 固定到右侧 */
    handleFixedRight(item) {
      this.$set(item, 'fixed', 'right')
      this.forceUpdate()
    },
    /* 重新刷新列表 */
    forceUpdate() {
      const columns = this.settingConfig.filter((item) => item.checked)
      this.$emit('column-change', cloneDeep(columns))
      this.$emit('source-change', 'child')
    },
    /* 拖拽结束 */
    handleDragEnd() {
      // 将checked的columns值回传给父组件
      this.forceUpdate()
      // fixed bug: 拖拽字段，拖拽不成功的问题
      this.$nextTick(() => {
        this.drag = false
      })
    },
    /* 是否全选 */
    isCheckAll() {
      return this.settingConfig.every((item) => item.checked)
    },
    /* 是否一个都不选 */
    isCheckNone() {
      return this.settingConfig.every((item) => !item.checked)
    },
    /* 勾选变化时 */
    handleCheckChange() {
      if (this.isCheckAll()) {
        // 全选
        this.checkAll = true
        this.indeterminate = false
      } else if (this.isCheckNone()) {
        // 全不选
        this.checkAll = false
        this.indeterminate = false
      } else {
        // 半选
        this.checkAll = false
        this.indeterminate = true
      }

      this.forceUpdate()
    },
    /* 设置初始columns */
    initConfig() {
      const originColumns = this.originColumns.length ? this.originColumns : this.columns
      this.settingConfig = originColumns
        .filter((item) => item.label)
        .map((item) => {
          const checked = this.columns
            .map((item) => item.label)
            .includes(item.label)
          return {
            ...item,
            checked
          }
        })
    },
    /* 重置 */
    handleReset() {
      this.checkAll = true
      this.indeterminate = false
      const originColumns = this.originColumns.length ? this.originColumns : this.columns
      const columns = cloneDeep(originColumns)
      this.$emit('column-change', cloneDeep(columns))
      this.$emit('source-change', 'child')
    },
    /* 全选状态变化时 */
    handleCheckAllChange(checkAll) {
      this.checkAll = checkAll
      if (checkAll) {
        this.indeterminate = false
      }
      // 设置列表的勾选状态
      this.setListCheckedStatus()
    },
    /* 设置选择的状态 */
    setListCheckedStatus() {
      if (this.checkAll) {
        // 选中
        this.settingConfig.forEach((item) => {
          this.$set(item, 'checked', true)
        })
      } else {
        this.settingConfig.forEach((item) => {
          this.$set(item, 'checked', false)
        })
      }

      this.forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  margin: 0 0 0 10px;
  font-size: 16px;
  cursor: pointer;
  color: #8c8c8c;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 24px;
  ::v-deep .el-checkbox{
    width: calc(100% - 40px);
    padding-right: 10px;
    overflow: hidden;
  }
  .btn-wrapper{
    width: 40px;
  }
  &:hover .btn-wrapper {
    display: inline-block;
  }
}
.btn-wrapper {
  display: none;
  font-size: 16px;
  min-width: 30px;
  .icon {
    margin: 0 1px;
    color: #409eff;
    cursor: pointer;
  }
}

</style>
