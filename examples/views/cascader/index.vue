<template>
  <div class="cascader">
    <el-card>
      <y-address-pro></y-address-pro>
    </el-card>
    <el-card>
      <CascaderMd class="md"></CascaderMd>
    </el-card>
  </div>
</template>

<script>
import CascaderMd from '../../../docs/components/cascader.md'
export default {
  name: 'Cascader',
  components: {
    CascaderMd
  },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
