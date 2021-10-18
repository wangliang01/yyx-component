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
  methods: {
    //  导出excel
    handleExport() {
      if (!Array.isArray(this.data) || this.data.length < 1) {
        // 当导出数据为空时，提示用户
        return this.$message.warning('数据为空， 无法进行导出')
      }
      let tableData = []
      if (this.format && typeof this.format === 'function') {
        tableData = this.format(this.data)
      } else {
        tableData = this.data
      }

      // excel表头
      const excelHeader = this.buildHeader(this.columns)
      const headerRows = excelHeader.length
      // excel数据
      const excelData = this.extractData(tableData, this.columns)
      // 表头 + 数据
      const sheetData = [...excelHeader, ...excelData]
      // 生成worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData, headerRows)

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

      const blobParts = this.stringToBuffer(wbout)
      const blob = new Blob([blobParts], { type: 'application/octet-stream' })
      this.downloadExcel(blob, this.sheetName + '.xlsx')
    },
    // 从github复制过来
    aoa_to_sheet(data, headerRows) {
      const ws = {}
      const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 }}
      for (let R = 0; R !== data.length; ++R) {
        for (let C = 0; C !== data[R].length; ++C) {
          if (range.s.r > R) {
            range.s.r = R
          }
          if (range.s.c > C) {
            range.s.c = C
          }
          if (range.e.r < R) {
            range.e.r = R
          }
          if (range.e.c < C) {
            range.e.c = C
          }
          // / 这里生成cell的时候，使用上面定义的默认样式
          const cell = {
            v: data[R][C] || '',
            s: {
              font: { name: '宋体', sz: 11, color: { auto: 1 }},
              alignment: {
                // / 自动换行
                wrapText: 1,
                // 居中
                horizontal: 'center',
                vertical: 'center',
                indent: 0
              }
            }
          }
          // 头部列表加边框
          if (R < headerRows) {
            cell.s.border = {
              top: { style: 'thin', color: { rgb: '000000' }},
              left: { style: 'thin', color: { rgb: '000000' }},
              bottom: { style: 'thin', color: { rgb: '000000' }},
              right: { style: 'thin', color: { rgb: '000000' }}
            }
            cell.s.fill = {
              patternType: 'solid',
              fgColor: { theme: 3, 'tint': 0.3999755851924192, rgb: 'DDD9C4' },
              bgColor: { theme: 7, 'tint': 0.3999755851924192, rgb: 'E7EBF4' }
            }
          }
          const cell_ref = XLSX.utils.encode_cell({ c: C, r: R })
          if (typeof cell.v === 'number') {
            cell.t = 'n'
          } else if (typeof cell.v === 'boolean') {
            cell.t = 'b'
          } else {
            cell.t = 's'
          }
          ws[cell_ref] = cell
        }
      }
      if (range.s.c < 10000000) {
        ws['!ref'] = XLSX.utils.encode_range(range)
      }
      return ws
    },
    extractData(tableData, columns) {
      // 导出的列结果集
      const excelRows = []
      for (const item of tableData) {
        excelRows.push(this.getRow(item, columns))
      }
      return excelRows
    },
    getRow(item, columns) {
      const row = []
      columns.forEach(column => {
        row.push(item[column.prop])
      })
      return row
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
      const header = []
      header.push(columns.map(column => column.label))
      return header
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
