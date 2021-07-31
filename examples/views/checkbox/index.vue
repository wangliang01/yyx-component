<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox v-for="(item,index) in arr" :key="index" :label="item">{{ item.name }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      checkList: [],
      arr: [
        {
          name: 'vue'
        },
        {
          name: 'react'
        },
        {
          name: 'jquery'
        }
      ]
    }
  },
  watch: {
    'checkList': {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    getLabel(item) {
      if (typeof item === 'object') {
        return JSON.stringify(item)
      }
      return item
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
