<template>
  <el-form
    ref="form"
    v-bind="$attrs"
    :model="formData"
    :style="`width: ${width || '100%'}; overflow: hidden;`"
    v-on="$listeners"
    @submit.native.prevent
  >
    <template v-for="(field, key) in config">
      <el-form-item
        v-if="field.showFormItem || field.showFormItem === undefined"
        :key="key"
        :label="field.hideLable ? '' : field.label + (field.labelSuffix || '')"
        :label-width="field.labelWidth ? field.labelWidth : (field['label-width'] ? field['label-width'] : $attrs['label-width'])"
        :rules="field.rules"
        :prop="field.prop"
        :required="field.required || false"
        :error="field.error"
        :show-message="field.showMessage || field['show-message']"
        :style="[...field.style]"
        :inline-message="field.inlineMessage || field['inline-message']"
        :size="field.size"
      >
        <span v-if="field.renderLabel" slot="label">
          <expandDom :render="field.renderLabel"></expandDom>
        </span>
        <span v-else-if="field.toolTip" slot="label">
          <span>{{ field.label }}</span>
          <el-tooltip v-if="Array.isArray(field.toolTip) && field.toolTip.length" effect="dark" placement="top-start">
            <div slot="content" class="tooltip-content">
              <p
                v-for="(text, i) of field.toolTip"
                :key="i"
              >{{ text }}</p>
            </div>
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
          <i v-else :class="[field.labelIcon]"></i>
          <span>{{ field.labelSuffix }}</span>
        </span>
        <component
          :is="field.fieldType || field.filter"
          v-bind="field"
          :value="formData[field.prop]"
          :on-pick="field.onPick"
          :style="`width: ${field.width || '100%'};`"
          @change.native="handleChange(field.onChange,$event)"
          @input.native="handleNativeInpute(field,$event)"
          @input="handleInpute(field,$event)"
          @clear="handleClear(field,$event)"
        ></component>
      </el-form-item>
    </template>
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
    Customer,
    expandDom: {
      functional: true,
      props: {
        render: Function
      },
      render(h, ctx) {
        const params = {}
        return ctx.props.render && ctx.props.render(h, params)
      }
    }
  },
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    config: {
      // 表单配置项
      type: [Object, Array],
      required: true
    },
    value: {
      // 表单数据
      type: [Object, Array],
      required: true
    },
    // 需要校验的字段
    validateProp: {
      type: [String, Array],
      default: ''
    }
  },
  data() {
    return {
      formData: this.value
    }
  },
  watch: {
    value: {
      handler(val) {
        this.formData = val
        // this.validateFields()
      },
      deep: true,
      immediate: true
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
    validateFields() {
      Object.keys(this.formData).forEach(fieldName => {
        if (typeof this.validateProp === 'string') {
          console.log('[需要额外校验的字段]:%c%s', 'color: green', this.validateProp)
          this.$nextTick(() => {
            // 对值进行校验
            if (fieldName === this.validateProp) {
              this.$refs.form.validateField(fieldName)
            }
          })
        } else if (Array.isArray(this.validateProp)) {
          console.log('[需要额外校验的字段]:%c%s', 'color: green', this.validateProp.toString())
          this.$nextTick(() => {
            // 对值进行校验
            if (this.validateProp.includes(fieldName)) {
              this.$refs.form.validateField(fieldName)
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
    // 注： datepicker不会触发input.native事件回调
    handleNativeInpute(field, event) {
      const onInput = field.onInput
      if (!onInput) {
        return
      }
      onInput(event.target.value, event)
      this.updateForm(field.prop, event.target.value)
    },
    handleInpute(field, value) {
      // 如果传入了onInput事件，则只调用handleNativeInpute方法，避免updateForm被重复调用
      if (field.onInput) {
        return
      }
      this.updateForm(field.prop, value)
    },
    handleClear(field) {
      // 清除按钮只会触发input事件而不会触发input.native,所以需要对传入了onInput事件的组件的清除事件单独处理
      if (field.onInput) {
        this.updateForm(field.prop, '')
      }
    },
    updateForm(fieldName, value) {
      /* fix: 如果值是字符串为空，或者全为空格，则先对其值进行trim */
      value = (typeof value === 'string' && value.trim() === '') ? value.trim() : value
      this.$set(this.formData, fieldName, value)
      this.$emit('input', this.formData)
    },
    handleChange(onChange, event) {
      if (!onChange) return
      onChange(event.target.value, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-left {
  text-align: left;
}

.tooltip-content {
  max-width: 300px;
  p {
    margin-bottom: 12px;
  }
}
</style>
