<template>
  <div class="domain-input">
    <el-row v-for="(item, index) in currentValue" :key="index" style="line-height: 50px">
      <el-col :span="19">
        <el-input v-model.trim="item.url" @input="handleInputEvent(index, $event)"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button style="width: 100%;" @click="delDomain(item)">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
      },
      deep: true
    }
  },
  mounted() {
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
