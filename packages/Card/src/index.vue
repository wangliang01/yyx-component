<template>
  <div class="card">
    <h2 class="card-title" :style="{fontSize: `${size}px`}">{{ title }}</h2>
    <el-row class="card-row">
      <el-col v-for="(item, index) in columns" :key="index" class="card-col" :span="span">
        <span class="card-label">{{ item.label }}:</span>
        <y-text :content="item.formattor ? item.formattor(data[item.prop]) : data[item.prop]" class="card-value"></y-text>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'YCard',
  components: {
  },
  props: {
    title: {
      type: String,
      default: 'Spu 基本信息'
    },
    data: {
      type: Object,
      default: () => {
        return {
          spuName: '胡萝卜AAA',
          shelfLife: '15',
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
          formattor(val) {
            if (val === 'standard') {
              return '标品'
            }
          }
        },
        {
          label: '品牌',
          prop: 'brand'
        },
        {
          label: '后类类目',
          prop: 'backType'
        },
        {
          label: '销售税率',
          prop: 'saleRate',
          formattor(val) {
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
          formattor(val) {
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
    },
    size: {
      type: [String, Number],
      default: 18
    }
  },
  data() {
    return {
    }
  },
  computed: {
    span() {
      if (!this.cols) return 24
      return Math.round(24 / this.cols)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {

    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 18px 24px 4px;
  background: #FFFFFF;
  border-radius: 4px;
  &-title{
    margin: 0;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }
  &-row{
    margin-top: 20px;
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
