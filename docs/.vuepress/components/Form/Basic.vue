<template>
  <el-card>
    <h2>典型表单</h2>
    <p>包括各种表单项，比如输入框，选择器，开关，单选框，多选框等</p>
    <el-card>
      <y-form
        v-model="form"
        :config="config"
        label-position="left"
        width="500px"
        label-width="100px"
      >
        <el-form-item>
          <el-button
            type="primary"
            @click="handleCreate"
          >立即创建</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </y-form>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: 'FormBasic',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date: '',
        time: '',
        delivery: false,
        startTime: '',
        endTime: '',
        type: [],
        resource: '',
        desc: ''
      },
      config: {
        name: {
          prop: 'name',
          label: '活动名称',
          fieldType: 'Input',
          labelSuffix: '：'
        },
        region: {
          prop: 'region',
          label: '活动区域',
          fieldType: 'Select',
          labelSuffix: '：',
          options: [
            {
              label: '上海',
              value: 'shanghai'
            },
            {
              label: '北京',
              value: 'beijing'
            }
          ]
        },
        dateRange: {
          label: '日期范围',
          fieldType: 'DatePicker',
          type: 'daterange',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '请选择结束日期',
          onPick: (value) => {
            const [startTime, endTime] = value
            this.form.startTime = startTime
            this.form.endTime = endTime
          }
        },
        date: {
          prop: 'date',
          label: '活动时间',
          fieldType: 'DatePicker',
          labelSuffix: '：'
        },
        // time: {
        //   prop: 'time',
        //   label: '-',
        //   hideLable: false,
        //   labelPosition: 'center',
        //   labelSuffix: '',
        //   labelWidth: '25px',
        //   fieldType: 'TimePicker',
        //   width: '60%',
        //   display: 'inline-block',
        //   pickerOptions: {
        //     start: '08:30',
        //     step: '00:15',
        //     end: '18:30'
        //   }
        // },
        delivery: {
          prop: 'delivery',
          label: '即时配送',
          fieldType: 'YSwitch',
          labelSuffix: '：'

        },
        type: {
          prop: 'type',
          fieldType: 'Checkbox',
          label: '活动性质',
          labelSuffix: '：',
          options: [
            {
              label: '美食/餐厅线上活动',
              name: 'type',
              cols: 12
            },
            {
              label: '地推活动',
              name: 'type',
              cols: 12
            },
            {
              label: '线下主题活动',
              name: 'type',
              cols: 12
            },
            {
              label: '单纯品牌曝光',
              name: 'type',
              cols: 12
            }
          ]
        },
        resource: {
          prop: 'resource',
          label: '特殊资源',
          fieldType: 'Radio',
          labelSuffix: '：',

          options: [
            {
              label: '线上品牌商赞助',
              value: '0',
              cols: 12
            },
            {
              label: '线下场地免费',
              value: '1',
              cols: 12
            }
          ]
        },
        desc: {
          prop: 'desc',
          label: '活动形式',
          fieldType: 'Input',
          type: 'textarea',
          labelSuffix: '：',
          rows: 2
        }
      },
    }
  },
  props: {

  },
  components: {
  },
  mounted() {

  },
  methods: {
    handleCreate() {
      console.log(this.form);
    },
    handleCancel() {
      console.log('cancel');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
