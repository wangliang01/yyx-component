<template>
  <div class="domain-input">
    <el-row v-for="(item, index) in currentValue" :key="index" style="line-height: 50px">
      <el-col :span="19">
        <el-input v-model.trim="item.url" @input="handleInputEvent(index, $event)"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button @click="delDomain(item)" style="width: 100%;">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
  },
  mounted() {
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
      },
      deep: true
    }
  },
  methods: {
    delDomain(item) {
      this.$emit('del', item)
    },
    handleInputEvent(index, value) {
      this.$emit('input', index, value)
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
