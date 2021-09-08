# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

::: demo

```html
<template>
  <y-form
    v-model="form"
    :config="config"
    label-position="left"
    width="500px"
    label-width="100px"
  >
    <el-form-item>
      <el-button type="primary" @click="handleCreate">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
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
        }
      }
    },
    methods: {
      handleCreate() {
        console.log(this.form)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

::: demo

```html
<template>
  <y-form
    :inline="true"
    v-model="form"
    :config="config"
    label-position="left"
    label-width="100px"
  >
    <el-form-item>
      <el-button type="primary" @click="handleCreate">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          user: '',
          region: ''
        },
        config: {
          user: {
            prop: 'user',
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
          }
        }
      }
    },
    methods: {
      handleCreate() {
        console.log(this.form)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## 对齐方式

根据具体目标和制约因素，选择最佳的标签对齐方式。

::: demo

```html
<template>
  <div>
    <el-radio-group v-model="labelPosition" size="small" class="y-m-b-20">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <y-form
      v-model="form"
      :config="config"
      :label-position="labelPosition"
      label-width="80px"
    >
      <el-form-item>
        <el-button type="primary" @click="handleCreate">立即创建</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </y-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'left',
        form: {
          name: '',
          region: '',
          type: ''
        },
        config: {
          name: {
            prop: 'name',
            label: '名称',
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
          type: {
            prop: 'type',
            label: '活动形式',
            fieldType: 'Input'
          }
        }
      }
    },
    methods: {
      handleCreate() {
        console.log(this.form)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

::: demo

```html
<template>
  <y-form
    ref="form"
    v-model="form"
    :config="config"
    label-position="left"
    width="500px"
    label-width="100px"
  >
    <el-form-item>
      <el-button type="primary" @click="handleCreate">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
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
          dateRange: '',
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
            labelSuffix: '：',
            rules: [{ required: true, message: '活动名称不能为空' }]
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
            ],
            rules: [
              {
                required: true,
                message: '请选择活动区域',
                trigger: ['blur', 'change']
              }
            ]
          },
          dateRange: {
            prop: 'dateRange',
            label: '日期范围',
            fieldType: 'DatePicker',
            type: 'daterange',
            startPlaceholder: '请选择开始日期',
            endPlaceholder: '请选择结束日期',
            onPick: (value) => {
              if (!value) return
              const [startTime, endTime] = value
              this.form.startTime = startTime
              this.form.endTime = endTime
            },
            rules: [
              {
                required: true,
                message: '请选择日期范围',
                trigger: ['blur', 'change']
              }
            ]
          },
          date: {
            prop: 'date',
            label: '活动时间',
            fieldType: 'DatePicker',
            labelSuffix: '：',
            rules: [{ required: true, message: '请选择活动时间' }]
          },
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
            ],
            rules: [
              {
                required: true,
                message: '请选择活动性质',
                trigger: ['blur', 'change']
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
            ],
            rules: [
              {
                required: true,
                message: '请选择特殊资源',
                trigger: ['blur', 'change']
              }
            ]
          },
          desc: {
            prop: 'desc',
            label: '活动形式',
            fieldType: 'Input',
            type: 'textarea',
            labelSuffix: '：',
            rows: 2,
            rules: [{ required: true, message: '活动形式不能为空' }]
          }
        }
      }
    },
    methods: {
      handleCreate() {
        this.$refs.form.validate()
        console.log(this.form)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

::: demo

```html
<template>
  <y-form
    ref="ruleForm"
    v-model="ruleForm"
    :config="config"
    label-position="left"
    width="500px"
    label-width="100px"
  >
    <el-form-item>
      <el-button type="primary" @click="handleCreate">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
</template>

<script>
  export default {
    name: 'FormBasic',
    data() {
      const checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        value = Number(value)
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        config: {
          pass: {
            prop: 'pass',
            label: '密码',
            fieldType: 'Input',
            rules: [{ required: true, validator: validatePass }]
          },
          checkPass: {
            prop: 'checkPass',
            label: '确认密码',
            fieldType: 'Input',
            rules: [
              {
                required: true,
                validator: validatePass2
              }
            ]
          },
          age: {
            prop: 'age',
            label: '年龄',
            fieldType: 'Input',
            rules: [
              {
                required: true,
                validator: checkAge,
                trigger: ['blur']
              }
            ]
          }
        }
      }
    },
    methods: {
      handleCreate() {
        this.$refs.ruleForm.validate()
        console.log(this.ruleForm)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## 日期选择

当`fieldType`为`DatePicker`时，可能通过`onPick`回调函数来获取选择的日期，包含起始日期，结束日期。

```js
 dateRange: {
    prop: 'dateRange',
    label: '日期范围',
    fieldType: 'DatePicker',
    type: 'daterange',
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
    onPick: (value) => {
      if (!value) return
      console.log("日期选择", value)
      const [startTime, endTime] = value
      this.form.startTime = startTime
      this.form.endTime = endTime
    }
 }
```

::: demo

```html
<template>
  <y-form
    ref="form"
    v-model="form"
    :config="config"
    label-position="left"
    width="500px"
    label-width="100px"
  >
    <el-form-item>
      <el-button type="primary" @click="handleCreate">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
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
          dateRange: '',
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
            labelSuffix: '：',
            rules: [{ required: true, message: '活动名称不能为空' }]
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
            ],
            rules: [
              {
                required: true,
                message: '请选择活动区域',
                trigger: ['blur', 'change']
              }
            ]
          },
          dateRange: {
            prop: 'dateRange',
            label: '日期范围',
            fieldType: 'DatePicker',
            type: 'daterange',
            startPlaceholder: '请选择开始日期',
            endPlaceholder: '请选择结束日期',
            onPick: (value) => {
              if (!value) return
              console.log('日期选择', value)
              const [startTime, endTime] = value
              this.form.startTime = startTime
              this.form.endTime = endTime
            },
            rules: [
              {
                required: true,
                message: '请选择日期范围',
                trigger: ['blur', 'change']
              }
            ]
          },
          date: {
            prop: 'date',
            label: '活动时间',
            fieldType: 'DatePicker',
            labelSuffix: '：',
            rules: [{ required: true, message: '请选择活动时间' }]
          },
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
            ],
            rules: [
              {
                required: true,
                message: '请选择活动性质',
                trigger: ['blur', 'change']
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
            ],
            rules: [
              {
                required: true,
                message: '请选择特殊资源',
                trigger: ['blur', 'change']
              }
            ]
          },
          desc: {
            prop: 'desc',
            label: '活动形式',
            fieldType: 'Input',
            type: 'textarea',
            labelSuffix: '：',
            rows: 2,
            rules: [{ required: true, message: '活动形式不能为空' }]
          }
        }
      }
    },
    methods: {
      handleCreate() {
        this.$refs.form.validate()
        console.log(this.form)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## 自定义渲染

当 FormItem 要渲染的不是`Input`, `Select`, `Radio`, `Checkbox`, `DatePicker`, `Switch`, `TimePicker`时，可以设置`fieldType`为`Customer`,并通过`render`来实现自定义渲染。

```js {5-11}
name: {
  prop: 'name',
  label: '活动名称',
  labelSuffix: '：',
  fieldType: 'Customer',
  render: {
    render(h) {
      // 也可以使用jsx语法： <div>自定义渲染名称</div>
      return h('div', '自定义渲染名称')
    }
  }
}
```

::: demo

```html
<template>
  <y-form
    ref="form"
    v-model="form"
    :config="config"
    label-position="left"
    width="500px"
    label-width="100px"
  >
    <el-form-item>
      <el-button type="primary" @click="handleCreate">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </y-form>
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
          dateRange: '',
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
            fieldType: 'Customer',
            labelSuffix: '：',
            render: {
              render(h) {
                // 也可以使用jsx语法： <div>自定义渲染名称</div>
                return h('div', '自定义渲染名称')
              }
            }
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
            ],
            rules: [
              {
                required: true,
                message: '请选择活动区域',
                trigger: ['blur', 'change']
              }
            ]
          },
          dateRange: {
            prop: 'dateRange',
            label: '日期范围',
            fieldType: 'DatePicker',
            type: 'daterange',
            startPlaceholder: '请选择开始日期',
            endPlaceholder: '请选择结束日期',
            onPick: (value) => {
              if (!value) return
              const [startTime, endTime] = value
              this.form.startTime = startTime
              this.form.endTime = endTime
            },
            rules: [
              {
                required: true,
                message: '请选择日期范围',
                trigger: ['blur', 'change']
              }
            ]
          },
          date: {
            prop: 'date',
            label: '活动时间',
            fieldType: 'DatePicker',
            labelSuffix: '：',
            rules: [{ required: true, message: '请选择活动时间' }]
          },
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
            ],
            rules: [
              {
                required: true,
                message: '请选择活动性质',
                trigger: ['blur', 'change']
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
            ],
            rules: [
              {
                required: true,
                message: '请选择特殊资源',
                trigger: ['blur', 'change']
              }
            ]
          },
          desc: {
            prop: 'desc',
            label: '活动形式',
            fieldType: 'Input',
            type: 'textarea',
            labelSuffix: '：',
            rows: 2,
            rules: [{ required: true, message: '活动形式不能为空' }]
          }
        }
      }
    },
    methods: {
      handleCreate() {
        this.$refs.form.validate()
        console.log(this.form)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
```

:::

## Form Attributes

| 参数                    | 说明                                                                                  | 类型    | 可选值            | 默认值 |
| ----------------------- | ------------------------------------------------------------------------------------- | ------- | ----------------- | ------ |
| value                   | 表单数据对象                                                                          | object  | -                 | -      |
| rules                   | 表单验证规则                                                                          | object  | -                 | -      |
| inline                  | 行内表单模式                                                                          | boolean | -                 | false  |
| width                   | 表单展示的宽度,例如'500px'                                                            | string  | -                 | -      |
| label-position          | 表单域标签的位置，如果值为 left 或者 right\n 时，则需要设置`label-width`              | string  | right/left/top    | right  |
| label-width             | 表单域标签的宽度，例如'50px'。作为 Form 直接子元素的 form-item 会继承该值，支持`auto` | string  | -                 | -      |
| label-suffix            | 表单域标签的后缀                                                                      | string  | -                 | -      |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色星号                                                  | boolean | -                 | false  |
| show-message            | 是否显示校错误信息                                                                    | boolean | -                 | false  |
| inline-message          | 是否以行内形式展示校验信息                                                            | boolean | -                 | false  |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                    | boolean | -                 | false  |
| validate-on-rule-change | 是否在`rules`属性改变后立即触发一次验证                                               | boolean | -                 | true   |
| size                    | 用于控制表单内的所有组件                                                              | string  | medium/small/mini | -      |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效     | -       | false             |

## Form Methods

| 方法名        | 说明                                                                                                                                                                 | 参数                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                         | Function(props: array)                         | string, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | -                                             |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果                                                             | Function(props: array)                         | string)                                           |

## Form Events

| 事件名称 | 说明                   | 回调参数                               |
| -------- | ---------------------- | -------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过。 |

## Columns Item Attributes

| 参数          | 说明                                                                         | 类型     | 可选值                                                                            | 默认值                |
| ------------- | ---------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------- | --------------------- |
| prop          | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string   | 传入 Form 组件的 model 中的字段                                                   | -                     |
| label         | 标签文本                                                                     | string   | 传入 Form 组件的 model 中的字段                                                   | -                     |
| labelWidth    | 表单域标签的的宽度，例如 '50px'。支持 `auto`                                 | string   | -                                                                                 |
| width         | 每一个 FormItem 的宽度                                                       | string   | -                                                                                 |
| required      | 是否必填，如不设置，则会根据校验规则自动生成                                 | boolean  | -                                                                                 | false                 |
| rules         | 表单验证规则                                                                 | object   | -                                                                                 | -                     |
| error         | 表单域验证错误信息, 设置该值会使表单验证状态变为 error，并显示该错误信息     | string   | -                                                                                 |
| showMessage   | 是否显示校验错误信息                                                         | boolean  | -                                                                                 | true                  |
| inlineMessage | 以行内形式展示校验信息                                                       | boolean  | -                                                                                 | false                 |
| size          | 用于控制该表单域下组件的尺寸                                                 | string   | `medium`/`small`/`mini`/                                                          | -                     |
| fieldType     | 表单项类型                                                                   | string   | <div style="width: 150px;">`Input`/`Select`/`Radio`/`Checkbox`/<br>`Switch`/`DatePicker`/`TimePicker`/`Customer`</div> | -                     |
| type          | 原始表单项类型                                                               | string   | `text`/`number`/`textarea`/`password`/`tel`                                      | -                     |
| onPick        | 日期表单项选择日期的回调                                                     | function | -                                                                                 | Function(prop: array) |
| options       | 如果 fieldType 类型为 Select, Checkbox, Radio 时，必填                       | array    | -                                                                                 | -                     |
