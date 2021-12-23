<template>
  <el-card>
    <TableProMd class="md"></TableProMd>
  </el-card>
</template>

<script>
import TableProMd from '../../../docs/components/tablepro.md'
export default {
  name: 'ProductArchives',
  components: {
    TableProMd
  }

}
</script>

<style lang="scss" scoped>
  .product-archives-container{
    height: 100%;
    overflow: hidden;
    padding: 0px 16px 16px 16px;
    box-sizing: border-box;
    .placeholder{
      height: 97px;
      background-color: #fff;
    }
  }
</style>
