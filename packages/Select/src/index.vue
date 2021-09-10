<template>
  <el-select
    v-bind="$attrs"
    :filterable="remote"
    :remote="remote"
    placeholder="请输入关键词"
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
      default: () => {}
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
    }
  },
  data() {
    return {
      list: [],
      options: [],
      loading: false
    }
  },
  watch: {
    '$attrs.options': {
      handler(val) {
        this.options = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    async getOptions() {
      if (typeof this.api === 'function') {
        const res = await this.api()

        if (res.success) {
          this.list = get(res, this.model.data, [])
          this.options = this.list
        }
      } else {
        this.list = this.$attrs.options
      }
    },
    remoteMethod(query) {
      query = query.trim()
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
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

</style>
