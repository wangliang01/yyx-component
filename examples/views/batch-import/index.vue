<template>
  <div class="batch-import">
    <y-batch-import :uploadSuccess="uploadSuccess" @upload="upload"></y-batch-import>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      uploadSuccess: false
    }
  },
  props: {

  },
  components: {
  },
  mounted() {

  },
  methods: {
    upload() {
      alert('888')
      this.uploadSuccess = true
    }
  }
}
</script>

<style scoped>

</style>
