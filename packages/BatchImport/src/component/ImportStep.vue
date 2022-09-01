<template>
  <div class="step-wrapper">
    <ImportStepItem
      v-for="(item,index) in stepList"
      :key="index"
      :index="index + 1"
      :item="item"
    ></ImportStepItem>
  </div>
</template>

<script>
import ImportStepItem from './ImportStepItem'
export default {
  name: 'ImportStep',
  components: { ImportStepItem },
  props: {
    stepList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.step-wrapper {
  background: #F7F8FA;
  display: flex;
  justify-content: space-around;
  padding: 0 10%;
}

</style>
