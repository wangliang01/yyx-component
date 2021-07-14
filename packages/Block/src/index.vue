<template>
  <div class="block">
    <div class="block-header">
      <h3 class="block-title">{{ title }}</h3>
      <div class="block-header-right">
        <slot name="block-header-right">
        </slot>
      </div>
    </div>
    <div class="block-content">
      <slot></slot>
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
  }
}
</script>

<style lang="scss" scoped>
.block {
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  &-header {
    padding: 0 16px;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background: #FAFAFA;
    border-radius: 4px 4px 0px 0px;
    border-bottom: 1px solid #F0F0F0;
  }
  &-title {
    margin: 0;
    padding: 0;
    line-height: 48px;
    font-size: 14px;
    font-weight: bold;
    color: #262626;
  }
  &-header-right {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &-content {
    padding: 16px;
  }
}
</style>
