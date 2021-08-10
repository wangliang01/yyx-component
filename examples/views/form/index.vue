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
            <el-button
              type="primary"
              @click="handleCreate"
            >立即创建</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>
    <el-card class="mt-20">
      <h2>行内表单</h2>
      <p>当垂直方向空间受限且表单较简单时，可以在一行内放置表单。</p>
      <el-card>

        <y-form
          v-model="formInline"
          :inline="true"
          :config="configInline"
          label-position="left"
          label-width="100px"
          :cols="8"
        >
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>
    <el-card class="mt-20">
      <h2>对齐方式</h2>
      <p>根据具体目标和制约因素，选择最佳的标签对齐方式。</p>
      <el-card>
        <el-radio-group
          v-model="labelPosition"
          size="small"
        >
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <y-form
          v-model="formInline"
          class="mt-20"
          :config="configInline"
          :label-position="labelPosition"
          label-width="100px"
          width="500px"
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
          ref="form"
          v-model="form"
          :config="config"
          label-position="left"
          width="500px"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="handleCreate('form')"
            >立即创建</el-button>
            <el-button @click="handleCancel">重置</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>

    <el-card class="mt-20">
      <h2>自定义验证</h2>
      <p>在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。</p>
      <el-card>
        <y-form
          ref="ruleForm"
          v-model="ruleForm"
          :config="config2"
          label-position="right"
          status-icon
          width="500px"
          label-width="100px"
          :rules="rules2"
        >
          <el-form-item label-width="100px">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>

    <el-card class="mt-20">
      <h2>动态增减表单项</h2>
      <el-card>
        <y-form
          ref="dynamicValidateForm"
          v-model="dynamicValidateForm"
          :config="dynamicValidateConfig"
          label-position="right"
          status-icon
          width="600px"
          label-width="100px"
          :rules="rules2"
        >
          <el-form-item label-width="100px">
            <el-button
              type="primary"
              @click="submitForm('dynamicValidateForm')"
            >提交</el-button>
            <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>

    <el-card class="mt-20">
      <h2>数字类型验证</h2>
      <el-card>

        <y-form
          ref="numberForm"
          v-model="numberForm"
          label-width="100px"
          :config="numberConfig"
          width="600px"
        >
          <el-form-item>
            <el-button type="primary" @click="submitForm('numberForm')">提交</el-button>
            <el-button @click="resetForm('numberForm')">重置</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>

    <el-card class="mt-20">
      <h2>表单内组件尺寸控制</h2>
      <el-card>
        <y-form ref="sizeForm" v-model="form" :config="config" label-width="100px" width="500px" size="mini">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm('sizeForm')">立即创建</el-button>
            <el-button @click="resetForm('sizeForm')">取消</el-button>
          </el-form-item>
        </y-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import DomainInput from '../../components/DomainInput'
export default {
  name: '',
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      numberForm: {
        age: ''
      },
      numberConfig: {
        age: {
          prop: 'age',
          label: '年龄',
          fieldType: 'Input',
          rules: [
            { required: true, message: '年龄不能为空' }
          ]
        }
      },
      dynamicValidateForm: {
        domains: [{
          url: ''
        }],
        email: ''
      },
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
          api() {
            return {
              code: '200',
              message: 'OK',
              success: true,
              data: [
                {
                  label: '上海',
                  value: 'shanghai'
                },
                {
                  label: '北京',
                  value: 'beijing'
                }
              ]
            }
          },
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
          api() {
            return {
              code: '200',
              message: 'OK',
              success: true,
              data: [
                {
                  label: '上海',
                  value: 'shanghai'
                },
                {
                  label: '北京',
                  value: 'beijing'
                }
              ]
            }
          },
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
      },
      labelPosition: 'left',
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      config2: {
        pass: {
          prop: 'pass',
          label: '密码',
          fieldType: 'Input',
          autocomplete: 'off',
          type: 'password'
        },
        checkPass: {
          prop: 'checkPass',
          label: '确认密码',
          fieldType: 'Input',
          type: 'password'
        },
        age: {
          prop: 'age',
          label: '年龄',
          fieldType: 'Input'
        }
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      dynamicValidateConfig: {
        email: {
          prop: 'email',
          label: '邮箱',
          fieldType: 'Input'
        },
        domains: {
          prop: 'domains',
          label: '域名',
          fieldType: 'Customer',
          filter: {
            render: (h) => {
              return <DomainInput value={this.dynamicValidateForm.domains} onDel={this.removeDomain}></DomainInput>
            }
          }
        }
      }
    }
  },
  methods: {
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        url: '',
        key: Date.now()
      })
      const i = this.dynamicValidateForm.domains.length
      this.dynamicValidateConfig[`domains${i}`] = {
        prop: `domains${i}`,
        label: `域名${i}`,
        fieldType: 'Customer',
        filter: {
          render: (h) => {
            return <DomainInput value={this.dynamicValidateForm.domains}></DomainInput>
          }
        }
      }
    },
    handleCreate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('立即创建', this.form)
        }
      })
    },
    handleCancel() {
      this.form = this.createForm()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    createForm() {
      return {
        name: '',
        region: '',
        date: '',
        time: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
