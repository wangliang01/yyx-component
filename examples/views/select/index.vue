<template>
  <div>
    <y-select v-model="value" :api="getDataApi" @change="handleChange"></y-select>
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
      value: '',
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming']
    }
  },
  mounted() {

  },
  methods: {
    getDataApi() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            code: '200',
            success: true,
            message: 'OK',
            data: this.states.map(item => {
              return { value: `value:${item}`, label: `label:${item}` }
            })
          })
        }, 300)
      })
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
