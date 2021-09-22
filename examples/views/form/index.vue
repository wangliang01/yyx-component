<template>
  <el-card class="form">
    <TestMd></TestMd>
  </el-card>
</template>

<script>
// import DomainInput from '../../components/DomainInput'
// import TestMd from '../../../docs/components/form.md'
export default {
  name: '',
  components: {
    TestMd: () => import('../../../docs/components/form.md')
  },
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
          rules: [{ required: true, message: '年龄不能为空' }]
        }
      },
      dynamicValidateForm: {
        domains: [
          {
            url: ''
          }
        ],
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
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      },
      dynamicValidateConfig: {
        email: {
          prop: 'email',
          label: '邮箱',
          fieldType: 'Input'
        }
        // domains: {
        //   prop: 'domains',
        //   label: '域名',
        //   fieldType: 'Customer',
        //   filter: {
        //     render: (h) => {
        //       return <DomainInput value={this.dynamicValidateForm.domains} onDel={this.removeDomain}></DomainInput>
        //     }
        //   }
        // }
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
    // addDomain() {
    //   this.dynamicValidateForm.domains.push({
    //     url: '',
    //     key: Date.now()
    //   })
    //   const i = this.dynamicValidateForm.domains.length
    //   this.dynamicValidateConfig[`domains${i}`] = {
    //     prop: `domains${i}`,
    //     label: `域名${i}`,
    //     fieldType: 'Customer',
    //     filter: {
    //       render: (h) => {
    //         return <DomainInput value={this.dynamicValidateForm.domains}></DomainInput>
    //       }
    //     }
    //   }
    // },
    handleCreate() {
      this.$refs.form.validate((valid) => {
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
