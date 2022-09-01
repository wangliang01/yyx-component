<template>
  <div class="step-item-wrapper">
    <div :class="['item-index',`item-index-${status}`]">
      <span v-show="status !== 'pass'">{{ index }}</span>
      <i v-show="status === 'pass'" class="el-icon-check"></i>
    </div>
    <span :class="['item-title',`item-title-${status}`]">
      {{ title }}
    </span>
    <span :class="['item-sub-title',`item-sub-title-${status}`]">
      {{ subTitle }}
    </span>
    <div class="item-sub-title">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YStepItem',
  props: {
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      index: null
    }
  },
  computed: {
    status() {
      const active = this.$parent.active + 1
      if (this.index === active) {
        return 'active'
      } else if (this.index < active) {
        return 'pass'
      } else {
        return 'unactive'
      }
    }
  },
  watch: {

  },
  mounted() {

  }

}
</script>

<style lang="scss" scoped>
.step-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .item-index {
    text-align: center;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 48px;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .item-index-pass {
    background: #E8F8F2;
    color: #009F64;
    font-size: 20px;
  }

  .item-index-active {
    color: #F7F8FA;
    background: #009F64;
  }

  .item-index-unactive {
    color: rgba(0, 0, 0, 0.6);
    border: .5px solid #DEE2E7;
  }

  .item-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
  }

  .item-title-pass {
    color: rgba(0, 0, 0, 0.9);
  }

  .item-title-active {
    color: #009F64;
  }

  .item-title-unactive {
    color: rgba(0, 0, 0, 0.4);
  }

  .item-sub-title {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
}

</style>
