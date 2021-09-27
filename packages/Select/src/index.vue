<template>
  <div :key="key" class="y-select">
    <el-select
      ref="select"
      v-bind="$attrs"
      :filterable="remote"
      :remote="remote"
      :placeholder="$attrs.placeholder === undefined ? '请输入关键词' : $attrs.placeholder"
      :remote-method="remote ? remoteMethod : null"
      :loading="loading"
      v-on="$listeners"
    >
      <el-option
        v-for="item in options"
        :key="item[model.value]"
        :label="item[model.label]"
        :value="item[model.value]"
      >
      </el-option>
    </el-select>
    <div v-if="unit" ref="unit" class="unit">{{ unit }}</div>
  </div>
</template>

<script>
import { get } from 'lodash'
export default {
  name: 'YSelect',
  components: {
  },
  props: {
    remote: {
      type: Boolean,
      default: true
    },
    api: {
      type: Function,
      default: null
    },
    model: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value',
          data: 'data'
        }
      }
    },
    unit: {
      type: String,
      default: ''
    },
    format: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      key: Math.random().toString(36).replace('.', ''),
      list: [],
      options: [],
      loading: false
    }
  },
  watch: {
    '$attrs.options': {
      handler(val) {
        if (Array.isArray(val)) {
          this.options = val
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getOptions()
    this.init()
  },
  activated() {
    this.getOptions()
  },
  methods: {
    init() {
      const select = this.$refs.select.$el
      const inputInner = select.querySelector('.el-input__inner')
      if (!inputInner) return
      if (this.unit) {
        inputInner.classList.add('fix-border-radius')
        const unit = this.$refs.unit
        /* 修复el-input__inner与el-input差2px的问题 */
        unit.style.height = (Math.round(select.getBoundingClientRect().height) - 2) + 'px'
      } else {
        inputInner.classList.remove('fix-border-radius')
      }
    },
    async getOptions() {
      if (typeof this.api === 'function') {
        const res = await this.api()
        if (res.success) {
          this.list = get(res, this.model.data, [])
          if (typeof this.format === 'function') {
            // 如果有format， 则先对数据进行格式化
            this.list = this.format(this.list)
          }
          this.options = this.list
          this.$emit('loaded', this.list)
        }
      } else {
        this.list = this.$attrs.options
        this.options = this.list
      }
    },
    remoteMethod(query) {
      query = query.trim()
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            console.log('this.model.label', this.model.label)
            item[this.model.label] = item[this.model.label] ? item[this.model.label] : ''
            return item[this.model.label].toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = this.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.y-select{
  display: inline-flex;
}
.unit{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  border: 1px solid #DCDFE6;
  background-color: $--border-color-light;
  border-radius: 4px;
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
