<template>
  <div>
    <el-card>
      <h2>品类级联选择器</h2>
      <y-category-cascader
        v-model="value"
        style="width: 200px;"
        :data-api="dataApi"
        :input-value="inputValue"
        @value-change="handleChange"
      ></y-category-cascader>
    </el-card>
    <el-card style="margin-top: 20px;">
      <h2>地址级联选择器</h2>
      <y-address-cascader
        v-model="address"
        style="width: 200px;"
        @change="handleAddressChange"
        @input-value="handleInputValue"
      >

      </y-address-cascader>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Cascader',
  data() {
    return {
      /* eslint-disable */
      dataApi: this.getDataApi.apply(this, [{ a: 111 }]),
      inputValue: '选项1 / 选项2 / 选项4',
      value: '1,2,4',
      // address: ["110000", "110100", "110101"]
      address: '110000,110100,110102'
    }
  },
  props: {

  },
  components: {
  },
  mounted() {

  },
  methods: {
    getDataApi(params) {
      let id = 0
      let level = 0
      return () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 })
              .map(item => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              }))
            level++
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve({
              data: nodes
            })
          }, 300)
        })
      }
    },
    handleChange(value, inputValue) {
    },
    handleAddressChange(value) {
    },
    handleInputValue(value, inputValue) {
    }
  }
}
</script>

<style scoped>
.el-cascader {
  display: block;
}
</style>
