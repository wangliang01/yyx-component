<template>
  <div class="y-empty">
    <div class="y-empty__image">
      <img src="./icons/no-data.png" alt="暂无数据">
    </div>
    <div class="y-empty__description">
      暂无数据
    </div>
  </div>

</template>

<script>
export default {
  name: 'YEmpty'
}
</script>

<style lang="scss" scoped>
.y-empty {
  margin: 16px 0;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  .y-empty__image {
    width: 115px;
    height: 86px;
    margin: auto;
    img {
      width: 100%;
    }
  }
  .y-empty__description{
    margin-top: 8px;
    color: #B1B2B2;
  }
}
</style>
