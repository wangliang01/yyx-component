<template>
  <div>
    <y-select v-model="value" :api="getDataApi" :model="model" @change="handleChange"></y-select>
    <y-select v-model="value" :options="options" :remote="false"></y-select>
  </div>
</template>

<script>
const originData = { 'code': '200', 'data': { 'current': 0, 'hitCount': true, 'pages': 0, 'records': [{ 'semifinishedId': 1, 'semifinishedName': '土豆丝', 'semifinishedSpecificationId': 1, 'semifinishedSpecificationName': '250g' }, { 'semifinishedId': 2, 'semifinishedName': '土豆块', 'semifinishedSpecificationId': 2, 'semifinishedSpecificationName': '250g' }], 'searchCount': true, 'size': 0, 'total': 0 }, 'msg': '', 'success': true }
export default {
  name: '',
  components: {
  },
  props: {

  },
  data() {
    return {
      value: '',
      model: { label: 'semifinishedName', value: 'semifinishedId', data: 'data.records' },
      options: [{
        value: 0,
        label: '0'
      }, {
        value: 1,
        label: '1'
      }, {
        value: 3,
        label: '3'
      }, {
        value: 6,
        label: '6'
      }, {
        value: 9,
        label: '9'
      }, {
        value: 13,
        label: '13'
      }],
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
          resolve(originData)
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
