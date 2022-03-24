<template>
  <el-descriptions v-bind="$attrs" :column="column">
    <template v-for="(item, index) in columns">
      <el-descriptions-item v-if="item.render" :key="index" v-bind="item">
        <template>
          <expandDom
            :render="item.render"
            :data="data"
            :prop="item.prop"
          >
          </expandDom>
        </template>
      </el-descriptions-item>
      <el-descriptions-item v-else :key="index" v-bind="item"><y-text>{{ item.formatter ? item.formatter(data[item.prop]) : data[item.prop] }}</y-text></el-descriptions-item>
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
        return {
          spuName: '胡萝卜AAA',
          shelfLife: 15,
          type: 'standard',
          brand: '集鲜到',
          backType: '生鲜蔬菜/根茎类/萝卜/胡萝卜',
          saleRate: '0.00',
          salePrice: '斤',
          address: '成都',
          storageTemperatureZone: '常温',
          purchaseTaxRate: '0.10',
          minSpec: '500ml/瓶',
          averageWeight: '大于200g',
          shape: '大小均匀、没有坑洼'
        }
      }
    },
    columns: {
      type: Array,
      default: () => [
        {
          label: 'SPU 名称',
          prop: 'spuName'
        },
        {
          label: '保质期',
          prop: 'shelfLife'
        },
        {
          label: '类型',
          prop: 'type',
          formatter(val) {
            if (val === 'standard') {
              return '标品'
            }
          }
        },
        {
          label: '品牌',
          prop: 'brand',
          render(h, { data, prop }) {
            return <y-image src='11' width='60'></y-image>
          }
        },
        {
          label: '后类类目',
          prop: 'backType'
        },
        {
          label: '销售税率',
          prop: 'saleRate',
          formatter(val) {
            return `${val}%`
          }
        },
        {
          label: '最小销售单位',
          prop: 'salePrice'
        },
        {
          label: '产地',
          prop: 'address'
        },
        {
          label: '储藏温区',
          prop: 'storageTemperatureZone'
        },
        {
          label: '采购税率',
          prop: 'purchaseTaxRate',
          formatter(val) {
            return `${val}%`
          }
        },
        {
          label: '最小规格',
          prop: 'minSpec'
        },
        {
          label: '均重',
          prop: 'averageWeight'
        },
        {
          label: '形状',
          prop: 'shape'
        }

      ]
    },
    cols: {
      type: [String, Number],
      default: 4
    }
  },
  data() {
    return {

    }
  },
  computed: {
    column() {
      return this.cols ? Number(this.cols) : 3
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
