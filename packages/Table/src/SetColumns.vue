<template>
  <el-popover class="set-columns" placement="bottom" trigger="click">
    <i slot="reference" class="iconfont icon-bianji"> 设置列</i>
    <div class="columns-top-set">
      <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <span>已选{{ selectedNum }}项</span>
      <el-button type="text" @click="handleResetColumns">重置</el-button>
    </div>
    <div class="columns-list">
      <Draggable v-model="columnList" :scroll="true" :delay="50" handle=".mover" chosen-class="chosen-item" group="list" animation="250" @end="handleDragEnd">
        <div v-for="(col, index) in columnList" :key="index" class="list-item">
          <el-checkbox v-model="col.showCol" :disabled="disabledCols(col)" @change="handleCheckChange">
            <span class="mover">{{ col.label }}</span>
          </el-checkbox>
          <div class="left-right">
            <el-tooltip effect="dark" :open-delay="300" content="左侧固定" placement="top">
              <i class="icon el-icon-back" @click="handleFixed(col, 'left')"></i>
            </el-tooltip>
            <el-tooltip effect="dark" :open-delay="300" content="右侧固定" placement="top">
              <i class="icon el-icon-right" @click="handleFixed(col, 'right')"></i>
            </el-tooltip>
          </div>
        </div>
      </Draggable>
    </div>
  </el-popover>
</template>
<script>
import { cloneDeep } from 'lodash'
import Draggable from 'vuedraggable'
export default {
  name: 'SetColumns',
  components: { Draggable },
  props: {
    value: { // 双向绑定值
      type: Array,
      default: () => []
    },
    originColumns: { // 源列定义
      type: Array,
      default: () => []
    },
    userSetColumns: { // 用户定义的 列定义
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      columnList: this.getColumnList(true) // 已经选中的列定义
    }
  },
  computed: {
    selectedNum() {
      return this.columnList.filter(im => im.showCol).length
    }
  },
  created() {
    this.checkAll = this.columnList.every(im => im.showCol)
  },
  methods: {
    // 获取源列定义数据
    getColumnList(isOrigin = false) {
      // isOrigin 标志是否源 数据
      const columnList = isOrigin && this.userSetColumns.length === 0
        ? cloneDeep(this.originColumns).map((im, i) => {
          im.fixed = null
          im.showCol = true
          return im
        })
        : this.userSetColumns
      return columnList
    },
    // 全选
    handleCheckAllChange(val) {
      this.columnList.forEach(col => {
        col.showCol = val || this.disabledCols(col)
      })
      this.$emit('input', this.columnList)
    },
    // 项目选中变化
    handleCheckChange(val) {
      this.checkAll = val ? this.columnList.every(im => im.showCol) : val
      this.$emit('input', this.columnList)
    },
    // 重置列定义
    handleResetColumns() {
      this.columnList = this.getColumnList(true)
      this.checkAll = this.columnList.every(im => im.showCol)
      this.$emit('input', this.columnList)
    },
    // 拖拽完成
    handleDragEnd() {
      this.$emit('input', this.columnList)
    },
    // 禁用选中的 列
    disabledCols(col) {
      return Boolean(col.fixed) || col.prop === 'action' || col.label === '操作'
    },
    // 浮动设置
    handleFixed(col, type) {
      col.fixed = (col.fixed === type) ? null : type // 如果已经是 左浮动，再次点击可以清除 左浮动 右侧同理
      this.$emit('input', this.columnList)
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
.columns-top-set {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  border-bottom: 1px solid #ededed;
  margin-bottom: 5px;
}
.columns-list {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  box-sizing: border-box;
  min-width: 200px;
  .chosen-item {
    border-top: 2px solid #409eff;
  }
  .list-item {
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    .left-right {
      display: none;
    }
  }
  .list-item:hover {
    .left-right {
      display: block;
      i {
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>
