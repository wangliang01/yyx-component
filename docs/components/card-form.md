# card-form 表单 

由card标题、输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

## 基本用法

CardForm主要继承YForm的属性，提供一个card的默认样式，标题，并可以自定义标题, Form表单配置项属性config与Form相同

::: demo

```html
<template>
  <div>
    <y-card-form ref="form" v-model="form" :config="config" :field="['name']">
      <span slot="title" style="color: red; font-size: 12px;">完全打开</span>
    </y-card-form>
    <el-button @click="handleSubmit">submit</el-button>
  </div>
</template>

<script>
import data from '../../examples/views/cascader/option'
const options = [
  {
    label: 'Vue',
    value: 'vue'
  },
  {
    label: 'React',
    value: 'react'
  },
  {
    label: 'Angular',
    value: 'angular'
  }
]
export default {
  data() {
    return {
      dataApi: this.getDataApi,
      params: {
        name: ''
      },
      form: {
        name: '',
        age: '',
        address: ''
      },
      value: '',
      config: {
        name: {
          prop: 'name',
          label: '姓名',
          fieldType: {
            render: () => {
              return <el-select v-model={this.form.name} onChange={this.handleChange}>
                {options.map(option => {
                  return <el-option value={option.value} label={option.label} ></el-option>
                })}
              </el-select>
            }
          },
          rules: [{ required: true, message: 'name参数必填', trigger: 'blur' }]
        },
        age: {
          prop: 'age',
          label: '年龄',
          fieldType: 'Input',
          rules: [{ required: true, message: 'age参数必填', trigger: 'blur' }]
        },
        address: {
          prop: 'address',
          label: '地址',
          fieldType: {
            render: () => {
              return <y-cascader
                collapse-tags
                v-model={this.form.address}
                dataApi={this.dataApi}
                {...{
                  props: {
                    props: {
                      label: 'name',
                      value: 'id',
                      children: 'childDept',
                      multiple: false
                    }
                  },
                  on: {
                    checked(params) {
                      console.log('params', params)
                    },
                    change(data) {
                      console.log('change', data)
                    }
                  }
                }}
              ></y-cascader>
            }
          },
          rules: [{ required: true, message: '地址不能为空', trigger: ['blur', 'chage'] }]
        }
      }
    }
  },
  methods: {
    handleChange(val) {
      console.log(val, this.form)
    },
    getDataApi() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(data)
          resolve(data)
        }, 300)
      })
    },
    handleSubmit() {
      console.log('submit', this.$refs.form.$children[0])
      // this.$refs.form.$children[0].validateFields()
    }
  }
}
</script>

```

:::

## CardForm Attributes

| 参数                    | 说明                                                                                  | 类型    | 可选值            | 默认值 |
| ----------------------- | -------------------------------------------------------------------------------------| ------- | ----------------- | ------------- |
| withHeader              | 是否展示标题                                                                          | boolean  | -                 | true         |
| title                   | card标题字符串                                                                        | string  | -                 | 基础信息       |
| span                    | 一行展示多少个表单元素                                                                 | number  | -                 | 3              |
| offset                  | 表单容器偏移量                                                                        | number  | -                 | 20      |
| label-position          | 表单域标签的位置，如果值为 left 或者 right\n 时，则需要设置`label-width`                 | string  | -                 | right  |
| label-width             | 表单域标签的宽度，例如'50px'。作为 Form 直接子元素的 form-item 会继承该值，支持`auto`     | string  | -                 | -      |
| label-suffix            | 表单域标签的后缀                                                                      | string  | -                  | -      |
| field                   | 校验字段                                                                              | String, Array | -           | ''    |
| model                   | 表单绑定值                                                                            | object | -                  | {}  |
| config                  | 表单项配置数据与Form得config相同                                                                       | object | -                  | {}  |



## CardForm Slot

| 名称               | 说明                   |
| ------------------ | ---------------------- |
| title              | 顶部标题自定义内容       |
| header-right       | 顶部标题右侧自定义内容   |