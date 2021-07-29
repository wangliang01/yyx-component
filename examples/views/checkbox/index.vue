<template>
  <el-checkbox-group v-model="arr">
    <y-checkbox v-for="(item, index) in arr" :key="index">{{ item.name }}</y-checkbox>
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
