<template>
  <div class="card">
    <h2 v-if="hasTitle" class="card-title" :style="{ fontSize: `${size}px` }">
      {{ title }}<slot name="title"> </slot>
    </h2>
    <y-descriptions v-if="descriptions" v-bind="$attrs" :data="data" :columns="columns" :cols="cols"></y-descriptions>
    <el-row v-else class="card-row">
      <el-col
        v-for="(item, index) in columns"
        :key="index"
        class="card-col"
        :span="span"
      >
        <span class="card-label">{{ item.label }}:</span>
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
    }
  },
  data() {
    return {}
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
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 18px 24px 4px;
  background: #ffffff;
  border-radius: 4px;
  &-title {
    margin: 0;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 20px;
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
