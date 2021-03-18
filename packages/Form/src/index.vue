<template>
  <el-form
    v-bind="$attrs"
    :model="formData"
    :style="`width: ${width || '100%'}; overflow: hidden;`"
    v-on="$listeners"
  >
    <el-form-item
      v-for="(field, key) in config"
      :key="key"
      :label="field.hideLable ? '' : field.label + (field.labelSuffix || '')"
      :label-width="field.labelWidth ? field.labelWidth : (field['label-width'] ? field['label-width'] : $attrs['label-width'])"
      :rules="field.rules"
      :prop="field.prop"
      :required="field.required || false"
      :error="field.error"
      :show-message="field.showMessage || field['show-message']"
      :inline-message="field.inlineMessage || field['inline-message']"
      :size="field.size"
      :style="`margin-left: ${field.marginLeft || 0}; margin-right: ${field.marginRight || ($attrs.inline ? '50px' : 0)}; display: ${!$attrs.inline ? (field.display ? field.display : 'block') : 'inline-block'}`"
    >
      <component
        :is="field.fieldType"
        v-bind="field"
        :value="formData[field.prop]"
        :on-pick="field.onPick"
        :style="`width: ${field.width || '100%'};`"
        @input="updateForm(field.prop, $event)"
      ></component>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
import Input from './components/Input'
import InputNumber from '../../InputNumber'
import Radio from './components/Radio'
import Select from './components/Select'
import DatePicker from './components/DatePicker'
import TimePicker from './components/TimePicker'
import YSwitch from './components/Switch'
import Checkbox from './components/Checkbox'
import Customer from './components/Customer'
export default {
  name: 'YForm',
  components: {
    Input,
    InputNumber,
    Radio,
    Select,
    DatePicker,
    TimePicker,
    YSwitch,
    Checkbox,
    Customer
  },
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    config: {
      // 表单配置项
      type: Object,
      required: true
    },
    value: {
      // 表单数据
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: { ...this.value },
      currentValue: ''
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = val
      },
      deep: true
    },
    config: {
      handler(val) {
        console.log('config watch: ', val)
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 解决y-form组件没有validate等相关方法的问题
      this.$children.forEach(component => {
        const el = component.$el
        const classList = [...el.classList]
        if (classList.includes('el-form')) {
          Object.keys(component).forEach(key => {
            if (['clearValidate', 'resetFields', 'validate', 'validateField'].includes(key)) {
              this[key] = component[key]
            }
          })
        }
      })
    },
    getLabelWidth() {
      if (typeof this.config === 'object') {
        const keys = Object.keys(this.config)
        if (keys.length) {
          const name = keys[0]
          const labelWidth = this.config[name]
            ? this.config[name].labelWidth
            : 0
          return labelWidth
        }
      }
      return 0
    },
    updateForm(fieldName, value) {
      this.formData[fieldName] = value
      this.$emit('input', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-left {
  text-align: left;
}
</style>
