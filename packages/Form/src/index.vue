<template>
  <el-form
    v-bind="$attrs"
    v-on="$listeners"
    :model="formData"
    :style="`width: ${width || '100%'}`"
  >
    <el-col
      :style="`display: ${$attrs.inline} ? 'inline-block' : 'block'`"
      :span="field.cols || $attrs.cols"
      v-for="(field, key) in config"
      :key="key"
    >
      <el-form-item
        :label="field.hideLable ? '' : `${field.label}：`"
        :label-width="field.labelWidth ? field.labelWidth : ($attrs.labelWidth ? $attrs.labelWidth : '100px') "
        :prop="field.prop"
      >
        <component
          :is="field.fieldType"
          v-bind="field"
          :value="formData[field.prop]"
          @input="updateForm(field.prop, $event)"
        ></component>
      </el-form-item>
    </el-col>
    <el-col>
      <slot></slot>
    </el-col>
  </el-form>
</template>

<script>
import Input from './components/Input'
import Radio from './components/Radio'
import Select from './components/Select'
import DatePicker from './components/DatePicker'
import TimePicker from './components/TimePicker'
import YSwitch from './components/Switch'
import Checkbox from './components/Checkbox'
export default {
  name: 'y-form',
  components: {
    Input,
    Radio,
    Select,
    DatePicker,
    TimePicker,
    YSwitch,
    Checkbox
  },
  data() {
    return {
      formData: { ...this.value },
      currentValue: ''
    }
  },
  props: {
    width: {
      type: String
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
  methods: {
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
