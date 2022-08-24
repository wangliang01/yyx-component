<template>
  <div class="card">
    <div class="card-header">
      <h2 v-if="hasTitle" class="card-title" :style="{ fontSize: `${size}px` }">
        <y-title>
          {{ title }}
          <slot name="title"> </slot>
        </y-title>
        <y-icon v-if="collapse" icon="iconzhedie" class="icon" width="14" :data-rotate="deg" :class="[isCollapse ? 'rotate--90' : 'rotate-90']" @click="handleToggle"></y-icon>
      </h2>
      <div class="card-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div v-if="deg==='90deg'" class="content-wrapper">
      <y-descriptions v-if="descriptions" v-bind="$attrs" :data="data" :columns="columns" :cols="cols"></y-descriptions>
      <el-row v-else class="card-row">
        <el-col
          v-for="(item, index) in columns"
          :key="index"
          class="card-col"
          :span="span"
        >
          <span v-if="item.renderLabel" class="card-label">
            <expandDom :render="item.renderLabel" :data="data" :prop="item.prop">
            </expandDom>
          </span>
          <span v-else class="card-label">{{ item.label }}:</span>
          <template v-if="item.render">
            <div class="card-value">
              <expandDom :render="item.render" :data="data" :prop="item.prop">
              </expandDom>
            </div>
          </template>
          <y-text
            v-else
            :content="
              item.formatter ? item.formatter(data[item.prop]) : data[item.prop]
            "
            class="card-value"
          ></y-text>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YCard',
  components: {
    expandDom: {
      functional: true,
      props: {
        render: Function,
        data: [Array, Object],
        prop: String
      },
      render(h, ctx) {
        const params = {}
        if (ctx.props.data) {
          params.data = ctx.props.data
        }
        if (ctx.props.prop) {
          params.prop = ctx.props.prop
        }
        return ctx.props.render && ctx.props.render(h, params)
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    descriptions: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => []
    },
    cols: {
      type: [String, Number],
      default: 4
    },
    size: {
      type: [String, Number],
      default: 18
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deg: '90deg'
    }
  },
  computed: {
    span() {
      if (!this.cols) return 24
      return Math.round(24 / this.cols)
    },
    hasTitle() {
      if (
        this.title === '' ||
        this.title === undefined ||
        this.title === null
      ) {
        return false
      } else {
        return true
      }
    },
    isCollapse() {
      return this.deg.indexOf('-') > -1
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
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
.card {
  padding: 18px 0 4px;
  background: #ffffff;
  border-radius: 4px;
  &-header {
    padding-left: 4px;
    margin-bottom: 12px;
    background-color: #F7F8FA;
  }
  &-title {
    display: inline-flex;
    align-items: center;
    margin: 0;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
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
  }
  .content-wrapper {
    padding: 0 16px 32px 16px;
  }
  &-col {
    margin-bottom: 16px;
  }
  &-label {
    display: table-cell;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #262626;
    line-height: 22px;
    white-space: nowrap;
    vertical-align: top;
  }
  &-value {
    display: inline-flex;
    display: table-cell;
    padding-left: 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #575757;
    line-height: 22px;
  }
}
</style>
