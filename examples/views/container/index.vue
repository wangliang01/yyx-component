<template>
  <div class="container">
    <y-container></y-container>
    <y-container></y-container>
    <y-container></y-container>
    <y-container></y-container>
  </div>
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

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  &>div{
    margin-right: 20px;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
