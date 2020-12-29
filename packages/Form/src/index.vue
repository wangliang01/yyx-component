<template>
  <el-form
    v-bind="$attrs"
    v-on="$listeners"
    :model="formData"
    :ref="$attrs.ref"
    :style="`width: ${width || '100%'}`"
  >
    <el-col
      :style="$attrs.inline ? 'inline-block' : 'block'"
      :span="field.cols ? field.cols : ($attrs.inline&&config.length >=4 ? 6 : $attrs.cols)"
      :offset="field.offset || 0"
      :push="field.push || 0"
      :pull="field.pull || 0"
      :xs="field.xs || $attrs.xs"
      :sm="field.sm || $attrs.sm"
      :md="field.md || $attrs.md"
      :lg="field.lg || $attrs.lg"
      :xl="field.xl || $attrs.xl"
      v-for="(field, key) in config"
      :key="key"
    >
      <el-form-item
        :label="field.hideLable ? '' : field.label + (field.labelSuffix || '')"
        :label-width="field.labelWidth ? field.labelWidth : ($attrs['label-width'] ? $attrs['label-width'] : '100px') "
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
    <slot v-if="$attrs.inline"></slot>
    <el-col v-else>
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
import YComponent from './components/Component'
export default {
  name: 'YForm',
  components: {
    Input,
    Radio,
    Select,
    DatePicker,
    TimePicker,
    YSwitch,
    Checkbox,
    YComponent
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
  watch: {
    value: {
      handler(val) {
        this.formData = val
      },
      deep: true
    }
  },
  mounted() {
    console.log('$attrs', this.$attrs)
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
