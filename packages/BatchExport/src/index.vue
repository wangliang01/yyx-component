<template>
  <el-button v-bind="$attrs" :type="$attrs.type ? $attrs.type : 'primary'" @click="handleExport">{{ btnText }}</el-button>
</template>

<script>
import XLSX from 'xlsx'
console.log(XLSX)
export default {
  name: 'YBatchExport',
  components: {
  },
  props: {
    btnText: {
      type: String,
      default: '导出'
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    format: {
      type: Function,
      default: null
    },
    sheetName: {
      type: String,
      default: '采购单详情'
    }

  },
  data() {
    return {
      excelData: []
    }
  },
  mounted() {

  },
  methods: {
    //  导出excel
    handleExport() {
      if (!Array.isArray(this.data) || this.data.length < 1) {
        // 当导出数据为空时，提示用户
        return this.$message.warning('数据为空， 无法进行导出')
      }
      if (this.format && typeof this.format === 'function') {
        this.excelData = this.format(this.data)
      } else {
        this.excelData = this.data
      }
      // excel表头
      const excelHeader = this.buildHeader(this.columns)
      const headerRows = excelHeader.length
      // 生成worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(excelHeader, headerRows)
      // 冻结表头
      worksheet['!freeze'] = {
        xSplit: '1',
        y: `${headerRows}`,
        topLeftCell: `B(${headerRows + 1})`,
        activePane: 'bottomRight',
        state: 'frozen'
      }
      // 列宽
      worksheet['!cols'] = [{ wpx: 165 }]

      // 工作簿
      const workbook = {
        SheetNames: [this.sheetName],
        Sheets: {
          [this.sheetName]: worksheet
        }
      }

      // excel样式
      const writingOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary',
        cellStyles: true
      }

      const wbout = XLSX.write(workbook, writingOptions)

      console.log('--------')
      console.log(wbout)
      const blobParts = this.stringToBuffer(wbout)
      const blob = new Blob([blobParts], { type: 'application/octet-stream' })
      this.downloadExcel(blob, this.sheetName + '.xlsx')
    },
    downloadExcel(blob, downloadName) {
      let url
      if (typeof blob === 'object' && blob instanceof Blob) {
        url = URL.createObjectURL(blob) // 创建blob地址
      }
      var aLink = document.createElement('a')
      aLink.href = url
      aLink.download = downloadName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event
      if (window.MouseEvent) {
        event = new MouseEvent('click')
      } else {
        event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false,
          false, false, false, 0, null)
      }
      aLink.dispatchEvent(event)
    },
    stringToBuffer(s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    // 构建表头
    buildHeader(columns) {
      return columns.map(column => [column.label])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
