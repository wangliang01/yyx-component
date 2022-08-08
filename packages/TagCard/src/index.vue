<template>
  <el-descriptions class="y-tag-card" v-bind="$attrs" title="" :column="Number(cols)" v-on="$listeners">
    <el-descriptions-item
      v-for="(item,$index) in columns"
      :key="$index"
      :label="item.label"
      :label-class-name="item.labelClassName"
      :content-class-name="item.contentClassName"
      :item-style="{'background-color':item.color,'border-color':item.color}"
    >
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
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import ElDescriptions from './descriptions/index'
export default {
  name: 'YTagCard',
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
    },
    ElDescriptions
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
  }
}
</script>
<style lang="scss" scoped>
::v-deep.y-tag-card.el-descriptions{
  tr{
    td{
      .el-descriptions-item__container{
        flex-flow: column wrap;
        margin-right: 8px;
        box-sizing: border-box;
        padding: 8px 10px;
        border-radius: 2px;
        border:1px solid #e4e7ed;
        .el-descriptions-item__label{
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          color: #4E504F;
          &::after{
            display: none;
          }
        }
        .el-descriptions-item__content{
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          color: #2F3030;
          font-weight: 500;
        }
      }
      &:last-of-type{
        .el-descriptions-item__container{
          margin-right: 0px;
        }
      }
    }
  }

}
</style>
