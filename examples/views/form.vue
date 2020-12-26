<template>
  <div>
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
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>
    <el-card class="mt-20">
      <h2>行内表单</h2>
      <p>当垂直方向空间受限且表单较简单时，可以在一行内放置表单。</p>
      <el-card>

        <y-form
          :inline="true"
          v-model="formInline"
          :config="configInline"
          label-position="left"
          label-width="100px"
          :cols="3"
        >
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>
    <el-card class="mt-20">
      <h2>表单验证</h2>
      <p>在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。</p>
      <el-card>

        <y-form
          v-model="form"
          :config="config"
          label-position="left"
          width="500px"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date: '',
        date2: '',
        time: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      config: {
        name: {
          prop: 'name',
          label: '活动名称',
          fieldType: 'Input'
        },
        region: {
          prop: 'region',
          label: '活动区域',
          fieldType: 'Select',
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
        date: {
          prop: 'date',
          label: '活动时间',
          fieldType: 'DatePicker',
          cols: 14
        },
        time: {
          prop: 'time',
          label: '',
          hideLable: true,
          labelWidth: '20px',
          fieldType: 'TimePicker',
          cols: 10,
          pickerOptions: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        },
        delivery: {
          prop: 'delivery',
          label: '即时配送',
          fieldType: 'YSwitch'
        },
        type: {
          prop: 'type',
          fieldType: 'Checkbox',
          label: '活动性质',
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
          options: [
            {
              label: '线上品牌商赞助',
              cols: 12
            },
            {
              label: '线下场地免费',
              cols: 12
            }
          ]
        },
        desc: {
          prop: 'desc',
          label: '活动形式',
          fieldType: 'Input',
          type: 'textarea'
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      formInline: {
        user: '',
        region: ''
      },
      configInline: {
        user: {
          prop: 'user',
          fieldType: 'Input',
          label: '审批人',
          placeholder: '审批人'
        },
        region: {
          prop: 'region',
          label: '活动区域',
          fieldType: 'Select',
          options: [
            {
              label: '区域一',
              value: 'shanghai'
            },
            {
              label: '区域二',
              value: 'beijing'
            }
          ]
        }
      }
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log('form', val)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped></style>
