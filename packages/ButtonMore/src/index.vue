<template>
  <div ref="buttonMore" class="button-more">
    <el-dropdown
      v-if="hasShowDropdown"
      :size="size"
      trigger="click"
      class="color--primary"
      @command="handleCommand"
    >
      <el-button type="primary">
        {{ btnText }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(col, index) in showColumns">
          <el-dropdown-item
            v-if="col.render"
            :key="index"
            :command="index"
          >
            <expandDom
              v-if="col.render"
              :key="index"
              :render="col.render"
            >
            </expandDom>
          </el-dropdown-item>
          <el-dropdown-item v-else :key="index" :command="index">{{
            col.text
          }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
    <template v-else>
      <template v-for="(col, index) in showColumns">
        <!-- 处理自定义render -->
        <expandDom
          v-if="col.render"
          :key="index"
          :col="col"
          :render="col.render"
        ></expandDom>
        <el-button
          v-else
          :key="index"
          type="text"
          :size="size"
          @click="col.handler"
        >{{ col.text }}</el-button>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'YButtonMore',
  components: {
    expandDom: {
      functional: true,
      props: {
        col: Object,
        render: Function
      },
      render(h, ctx) {
        const params = {}
        if (ctx.props.col) {
          params.col = ctx.props.col
        }
        return ctx.props.render && ctx.props.render(h, params)
      }
    }
  },
  props: {
    /* 尺寸大小 */
    size: {
      type: String,
      default: 'mini' // medium, small, mini
    },
    /* 最多显示多少个按钮 */
    max: {
      type: [String, Number],
      default: 3
    },
    /* 传入的列数据，常用于表格操作列 */
    row: {
      type: Object,
      default: () => {}
    },
    /*
      传入的按钮配置项
      text: String 按钮文字
      show: Function 是否显示按钮的方法
      handler: Function 处理按钮事件的回调方法
      render: Function 自定义render函数
     */
    columns: {
      type: Array,
      required: true
    },
    btnText: {
      type: String,
      default: '更多操作'
    }
  },
  data() {
    return {
      showColumns: []
    }
  },
  computed: {
    /* 是否展示下拉按钮 */
    hasShowDropdown() {
      // 当超过3个按钮时，显示下拉按钮
      return this.showColumns.length > this.max
    }
  },
  watch: {
    rows: {
      handler() {
        this.init()
        this.showColumns = this.columns.filter((col) => {
          return col.show()
        })

        if (this.showColumns.length > this.max) {
          this.$nextTick(() => {
            this.setButtonStyle()
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 对传入的数据进行校验
    init() {
      const parent = this.$parent
      this.columns.forEach((col) => {
        // 设置show方法的默认值
        if (col.show === undefined || typeof col.show !== 'function') {
          col.show = () => true
        } else {
          // 如果show有值，将row作为参数绑定到show方法上
          col.show = col.show.bind(parent, this.row)
        }
        if (col.handler === undefined || typeof col.handler !== 'function') {
          col.handler = () => {}
        } else {
          // 如果handler有值，将handler作为参数绑定到handler方法上
          col.handler = col.handler.bind(parent, this.row)
        }
      })
    },
    // 给下拉按钮添加样式
    setButtonStyle() {
      const elButton = this.$refs.buttonMore?.querySelector('.el-button')
      if (elButton) {
        // 移除primary样式
        elButton.classList.remove('el-button--primary')
        // 添加plain样式
        elButton.classList.add('is-plain')
        // 给字体添加primary颜色
        elButton.classList.add('color--primary')
      }
    },
    // 点击菜单项触发的事件回调
    handleCommand(index) {
      this.showColumns[index].handler()
    }
  }
}
</script>

<style lang="scss" scoped>
.color--primary {
  color: $--color-primary;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
</style>
