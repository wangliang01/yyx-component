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
            fieldType: 'Input',
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
