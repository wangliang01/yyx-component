<template>
  <div>
    <y-card-form ref="form" v-model="form" :config="config" :field="['name']">
      <span slot="title" style="color: red; font-size: 12px;">完全打开</span>
    </y-card-form>
    <el-button @click="handleSubmit">submit</el-button>
  </div>
</template>

<script>
import data from '../cascader/option'
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
  name: '',
  components: {
  },
  props: {

  },
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
  mounted() {

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

<style lang="scss" scoped>

</style>
