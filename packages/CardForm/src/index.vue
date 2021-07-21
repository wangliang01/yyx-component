<template>
  <div :key="key" class="y-card-form">
    <div v-if="withHeader" class="card-form-header-wrapper">
      <h3 class="title">{{ title }} <slot name="title"> </slot></h3>
      <slot name="header-right"></slot>
    </div>
    <div class="card-form-body">
      <y-form
        ref="form"
        v-model="formData"
        :config="config"
        :label-suffix="labelSuffix"
        label-position="right"
        :label-width="labelWidth"
        inline
      ></y-form>
    </div>
  </div>
</template>
<script>
const cid = Math.random().toString(32).replace('.', '')
export default {
  name: 'YCardForm',
  props: {
    withHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '基础信息'
    },
    span: {
      type: [String, Number],
      default: 3
    },
    offset: {
      type: [String, Number],
      default: 20
    },
    labelWidth: {
      type: String,
      default: '150px'
    },
    labelSuffix: {
      type: String,
      default: '：'
    },
    form: {
      type: Object,
      default: () => {
        return {
          supplierName: '',
          supplierType: '',
          contactName: '',
          contactNumber: '',
          contactAddress: '',
          expireTime: '',
          deliveryDays: '',
          unifiedSocialCreditCode: '',
          operatingPeriod: ''
        }
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          supplierName: {
            label: '供应商名称',
            prop: 'supplierName',
            fieldType: 'Input'
          },
          supplierType: {
            label: '供应商类型',
            prop: 'supplierType',
            fieldType: 'Select',
            options: []
          },
          contactName: {
            label: '联系人姓名',
            prop: 'contactName',
            fieldType: 'Input'
          },
          contactNumber: {
            label: '联系人电话',
            prop: 'contactNumber',
            fieldType: 'Input'
          },
          contactAddress: {
            label: '联系人地址',
            prop: 'contactAddress',
            fieldType: 'Input'
          },
          expireTime: {
            label: '报价有效周期',
            prop: 'expireTime',
            fieldType: 'Input'
          },
          deliveryDays: {
            label: '交货天数',
            prop: 'deliveryDays',
            fieldType: 'Input'
          },
          unifiedSocialCreditCode: {
            label: '统一社会信用代码',
            prop: 'unifiedSocialCreditCode',
            fieldType: 'Input'
          },
          operatingPeriod: {
            label: '交货天数',
            prop: 'operatingPeriod',
            fieldType: 'Radio',
            options: [{ label: '在线', value: 1 }, { label: '离线', value: 0 }]
          }
        }
      }
    }
  },
  data() {
    return {
      formData: {},
      key: cid,
      cols: this.span
    }
  },
  watch: {
    form: {
      handler(val) {
        this.formData = val
      },
      deep: true
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.init)
  },
  destroyed() {
    window.removeEventListener('resize', this.init)
  },
  methods: {
    init() {
      const form = this.$refs.form.$el
      const formItems = form.querySelectorAll('.el-form-item')
      const formWidth = form.clientWidth
      this.setCols(formWidth)

      for (const item of formItems) {
        // 获取el-form-item的width
        const itemWidth = Math.floor(formWidth / this.cols)
        // 获取el-form-item__label的paddingRight
        const paddingRight = parseInt(
          getComputedStyle(item.querySelector('.el-form-item__label'))
            .paddingRight
        )
        // 获取el-form-item__label的width
        const labelWidth = item
          .querySelector('.el-form-item__label')
          .getBoundingClientRect().width
        // 获取el-form-item__content的width
        const contentWidth = itemWidth - this.offset - labelWidth - paddingRight
        // 设置el-form-item__content的width
        const contentDom = item.querySelector('.el-form-item__content')
        contentDom.style.width = `${contentWidth}px`
      }
    },
    setCols(formWidth) {
      switch (true) {
        case formWidth > 1240:
          // 如果传入的cols大于4，则强制改为4
          if (this.cols >= 3) {
            this.cols = 4
          }
          break
        case formWidth > 992:
          if (this.cols >= 3) {
            this.cols = 3
          }
          break
        case formWidth > 768:
          if (this.cols >= 2) {
            this.cols = 2
          }
          break
        default:
          this.cols = 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.y-card-form {
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 4px;
  .title {
    display: inline-flex;
    align-items: center;
    margin: 0 0 27px 0;
    padding: 0;
    font-size: 18px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: #262626;
  }
}
</style>
