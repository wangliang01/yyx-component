<template>
  <el-descriptions v-bind="$attrs" :column="column">
    <template v-for="(item, index) in columns">
      <el-descriptions-item v-if="item.render" :key="index" v-bind="item">
        <template slot="label">
          <span v-if="item.renderLabel" class="card-label">
            <expandDom
              :render="item.renderLabel"
              :data="data"
              :prop="item.prop"
            >
            </expandDom>
          </span>
          <span v-else class="card-label">{{ item.label }}:</span>
        </template>
        <template>
          <expandDom :render="item.render" :data="data" :prop="item.prop">
          </expandDom>
        </template>
      </el-descriptions-item>
      <el-descriptions-item v-else :key="index" v-bind="item">
        <template slot="label">
          <span v-if="item.renderLabel" class="card-label">
            <expandDom
              :render="item.renderLabel"
              :data="data"
              :prop="item.prop"
            >
            </expandDom>
          </span>
          <span v-else class="card-label">{{ item.label }}:</span>
        </template>
        <y-text>{{
          item.formatter ? item.formatter(data[item.prop]) : data[item.prop]
        }}</y-text></el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<script>
export default {
  name: 'YDescriptions',
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
    }
  },
  data() {
    return {}
  },
  computed: {
    column() {
      return this.cols ? Number(this.cols) : 3
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
