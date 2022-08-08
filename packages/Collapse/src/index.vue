<template>
  <div class="y-collapse" :style="{padding: title ? null: 0}">
    <h3 v-if="title" class="title" @click="handleShow">
      {{ title }}<i class="iconfont el-icon-arrow-down" :class="{transup: show}"></i>
    </h3>
    <div ref="YContent" class="content" :style="{height: contentHeight}">
      <slot></slot>
    </div>
    <div v-if="height" class="show-all">
      <el-button type="text" @click="handleShowAll">
        {{ showAll ? '收起查看' : '查看全部' }}
        <i class="iconfont el-icon-arrow-down" :class="{transup: showAll}"></i>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'YCollapse',
  props: {
    height: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      showAll: false,
      contentHeight: 'max-content',
      maxHeight: 0
    }
  },
  mounted() {
    this.initHeight()
  },
  methods: {
    // 挂载后，获取滚动高度，并设置内容 高度
    initHeight() {
      this.maxHeight = this.$refs.YContent.scrollHeight
      this.contentHeight = 0
      if (this.height) {
        this.show = true
        this.contentHeight = this.height + 'px'
      }
    },
    // title 展开
    handleShow() {
      this.show = !this.show
      this.contentHeight = (this.show ? this.height || this.maxHeight : 0) + 'px'
      if (this.contentHeight === '0px') {
        this.showAll = false
      }
    },
    // 查看全部
    handleShowAll() {
      this.showAll = !this.showAll
      this.contentHeight = (this.showAll ? this.maxHeight : this.height) + 'px'
      if (this.contentHeight === this.maxHeight + 'px') {
        this.show = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.y-collapse {
  background-color: #fff;
  padding: 16px 0;
  border-radius: 5px;
  border: 1px solid #EBEEF5;
  .title{
    display: flex;
    align-items:baseline;
    height: 42px;
    padding: 0 16px;
    margin: 0 ;
    cursor: pointer;
    border-bottom: 1px solid #EBEEF5;
  }
  .iconfont {
    transition: all .3s ease-in-out;
    margin-left: 3px;
  }
  .transup {
    transform: rotate(-180deg);
    transition: all .3s ease-in-out;
  }
  .content {
    padding: 0 16px;
    transition: all .3s ease-in-out;
    overflow: hidden;
    >div {
      padding: 10px 0;
    }
  }
  .show-all {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
