<template>
  <div class="item-wrapper">
    <div style="text-align: center">
      <div class="icon-wrapper">
        <i :class="item.icon"></i>
      </div>
    </div>
    <div class="title">{{ index }}.{{ item.title }}</div>
    <div class="sub-title">{{ item.subTitle }}</div>
    <el-button
      v-if="item.buttonText"
      size="mini"
      class="button"
      @click="item.func"
    >
      {{ item.buttonText }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ImportStepItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number
    }
  }

}
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 21px 0;
  .icon-wrapper {
    text-align: center;
    width: 40px;
    height: 40px;
    background: #E8F8F2;
    border-radius: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 24px;
      color: #009F64;
    }
  }

  .title {
    text-align: center;
    color: #2F3030;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
  }

  .sub-title {
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #787979;
    height: 18px;
  }

  .button {
    color: rgba(0, 0, 0, 0.6);
    margin-top: 12px;
  }
}
</style>
