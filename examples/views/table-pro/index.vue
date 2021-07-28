<template>
  <div>
    <y-form v-model="form" :config="config"></y-form>
    <y-table-pro :load-data-api="loadDataApi" :columns="columns" ui-style="antd" offset="300" :params.sync="params" show-util-bar>
      <template slot="action-right" slot-scope="scope">
        <el-button type="primary" @click="handleSave(scope)">保存</el-button>
      </template>
    </y-table-pro>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      form: {
        id: ''
      },
      config: {
        id: {
          label: 'id',
          prop: 'id',
          labelWidth: '100px',
          fieldType: {
            render: () => {
              return <el-cascader
                v-model={this.form.id}
                options={this.options}
                on-change={this.handleChange}></el-cascader>
            }
          },
          rules: [{ required: true, message: '不能为空' }]
        }

      },
      params: {
        value: '',
        test: ''
      },
      columns: [
        {
          type: 'selection',
          width: '55px'
        },
        {
          prop: 'test',
          label: '你好13131231312313',
          filter: true,
          fieldType: 'Select',
          options: [{ label: '上架', value: true }, { label: '下架', value: false }]
        },
        {
          label: '日期',
          prop: 'date'
          // 自定义组件写法一
          // filter: {
          //   render: (h) => {
          //     return <y-cascader v-model={this.params.value} options={this.options}></y-cascader>
          //   }
          // }
        },
        {
          label: '姓名',
          prop: 'name',
          // 自定义组件写法二
          filter: true,
          fieldType: 'Customer',
          component: {
            render: (h) => {
              return <y-input v-model={this.params.value}></y-input>
            }
          }
        },
        {
          label: '地址',
          prop: 'address'
          // 自定义组件写法三
          // filter: true,
          // fieldType: {
          //   render: (h) => {
          //     return <y-cascader v-model={this.params.value} options={this.options}></y-cascader>
          //   }
          // }
        }
      ],
      loadDataApi: () => {
        return {
          code: '200',
          success: true,
          message: 'OK',
          data: {
            records: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }]
          }
        }
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  watch: {
    'params.test'(val) {
      console.log('watch value', val)
    }
  },
  async mounted() {
    // const options = await this.getOptions()
    // for (let i = 0; i < this.columns.length; i++) {
    //   const column = this.columns[i]
    //   if (column.prop === 'test') {
    //     column.options = options
    //     this.$set(this.columns, i, column)
    //   }
    // }
  },
  methods: {
    handleChange() {
      console.log('this.form', this.form)
    },
    handleSave(data) {
      console.log(data)
    },
    getOptions() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { name: '张一山', age: 19 },
            { name: '李现', age: 28 }
          ])
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
