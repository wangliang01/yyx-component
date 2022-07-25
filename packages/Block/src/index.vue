<template>
  <div class="block">
    <div class="block-header">
      <y-title class="block-title">
        <template v-if="title">
          {{ title }}
        </template>
        <slot name="title"></slot>
        <y-icon icon="iconzhedie" class="icon" width="14" :data-rotate="deg" :class="[isCollapse ? 'rotate--90' : 'rotate-90']" @click="handleToggle"></y-icon>
      </y-title>
      <div class="block-header-right">
        <slot name="block-header-right">
        </slot>
      </div>
    </div>
    <div class="block-content">
      <y-collapse>
        <div v-if="deg==='90deg'">
          <slot></slot>
        </div>
      </y-collapse>
    </div>

    <div class="block-footer">
      <slot name="block-footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YBlock',
  components: {
  },
  props: {
    title: {
      type: String,
      default: '属性组1名称：外包装'
    }
  },
  data() {
    return {
      deg: '90deg'
    }
  },
  computed: {
    isCollapse() {
      return this.deg.indexOf('-') > -1
    }
  },
  methods: {
    handleToggle(e) {
      const rotate = this.deg
      let newRotate
      if (this.isCollapse) {
        /* 如果是负值，则将值修改为正值 */
        newRotate = rotate.replace('-', '')
      } else {
        /* 如果是正值，则将值修改为负值 */
        newRotate = `-${rotate}`
      }
      this.deg = newRotate
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  border-radius: 4px;
  // border: 1px solid #D9D9D9;
  &-header {
    padding: 0 16px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background: #F7F8FA;
    border-radius: 4px 4px 0px 0px;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 12px;
  }
  &-title {
    margin: 0;
    padding: 0;
    line-height: 48px;
    font-size: 14px;
    font-weight: bold;
    color: #262626;
  }
  .icon {
    padding: 5px;
    margin-left: 10px;
    color: #B1B2B2;
    cursor: pointer;
    &.rotate-90 {
      transform: rotate(90deg);
    }
    &.rotate--90 {
      transform: rotate(-90deg);
    }
  }
  &-header-right {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &-content {
    padding: 0 16px 32px 16px;
  }
}
</style>
