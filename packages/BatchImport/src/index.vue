<template>
  <div class="batch-import" style="display: inline-block;margin-left: 10px">
    <!-- 按钮 -->
    <el-button
     type="primary"
      icon="el-icon-upload"
      @click="dialogVisible=true"
    >{{btnText}}</el-button>
    <!-- 按钮 end -->

    <!-- 弹窗  -->
    <el-dialog
      :title="btnText"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      modal-append-to-body
      lock-scroll
      width="92%"
    >
      <el-upload
        class="upload"
        action=""
        :multiple="false"
        :show-file-list="false"
        accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :http-request="httpRequest"
      >
        <el-button
          type="primary"
          icon="el-icon-upload"
        >选择文件</el-button>
        <div
          class="el-upload__tip"
          style="margin-top: 10px;"
          slot="tip"
        >
          只能上传excel文件<span v-if="size">，且不超过{{size}}kb</span>
        </div>
      </el-upload>
      <el-button-group>
        <el-button style="margin-top: 10px;" class="download" @click="downLoadExcel">下载模板</el-button>
        <el-button style="margin-top: 10px;margin-left: 10px;" class="edit" v-if="tableData.length" @click="handleToggleEdit">{{!isEdit ?'编辑数据' : '查看数据'}}</el-button>
      </el-button-group>

      <y-table
        :max-height="312"
        :data="tableData"
        :columns="currentColumns"
        pagination
        :total="total"
        :reload="reloadData"
        :colIndex="1"
      ></y-table>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗 end -->
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { merge, find } from 'lodash'
// import Vue from 'vue'
export default {
  name: 'YBatchImport',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      queryParams: {
        current: 1,
        size: 10
      },
      dbData: [],
      currentColumns: [],
      isEdit: false
    }
  },
  watch: {
    uploadSuccess: {
      handler(val) {
        if (val) {
          this.dialogVisible = false
          this.tableData = []
          this.dbData = []
          this.total = 0
          this.$forceUpdate()
        }
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    btnText: {
      type: String,
      default: '批量导入'
    },
    size: {
      type: [String, Number],
      default: 0
    },
    downLoadUrl: {
      type: String
      // required: true
    },
    // 是否上传成功
    uploadSuccess: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default() {
        return [
          {
            label: '商品名称',
            prop: 'name',
            type: 'input'
          },
          {
            label: '品牌',
            prop: 'brand',
            type: 'input'
          },
          {
            label: '规格',
            prop: 'spec',
            type: 'input'
          },
          {
            label: '一级品类',
            prop: 'oneCategory',
            type: 'input'
          },
          {
            label: '二级品类',
            prop: 'twoCategory',
            type: 'input'
          },
          {
            label: '三级品类',
            prop: 'threeCategory',
            type: 'input'
          },
          {
            label: '生产厂商',
            prop: 'manufacturer',
            type: 'input'
          },
          {
            label: '保质期',
            prop: 'shelfLifeDays',
            type: 'input'
          },
          {
            label: '计价单位',
            prop: 'priceUnit',
            type: 'input'
          },
          {
            label: '是否标品（是,否）',
            prop: 'normal',
            type: 'input'
          },
          {
            label: '销项税(%)',
            prop: 'salesTaxRate',
            type: 'input'
          },
          {
            label: '销售类型',
            prop: 'saleType',
            type: 'input'
          },
          {
            label: '进项税(%)',
            prop: 'procurementTaxRate',
            type: 'input'
          },
          {
            label: '存储温层',
            prop: 'temperature',
            type: 'select',
            options: [{ label: '冷冻（-18°C）', value: 'FREEZE' },
              { label: '冷藏（0°C——8°C）', value: 'COLD' },
              { label: '常温', value: 'NORMAL' }]
          }
        ]
      }
    }
  },
  created() {
    this.currentColumns = this.columns.map((item) => {
      return {
        label: item.label,
        prop: item.prop,
        render: (h, { row }) => {
          if (this.isEdit) {
            if (item.type === 'input') {
              return <el-input v-model={this.tableData[row.index][item.prop]} size='small' clearable></el-input>
            } else if (item.type === 'select') {
              return <el-select v-model={this.tableData[row.index][item.prop]} size='small' clearable>
                { item.options.map((option) => {
                  return <el-option key={option.value}
                    label={option.label}
                    value={option.value}>
                  </el-option>
                }) }
              </el-select>
            } else if (item.type === 'date-picker') {
              return <el-date-picker
                v-model={this.tableData[row.index][item.prop]}
                type='date'
                size='small'
                placeholder='选择日期'>
              </el-date-picker>
            } else if (item.type === 'input-number') {
              return <y-input-number v-model={this.tableData[row.index][item.prop]} size='small'></y-input-number>
            }
          } else {
            return <div onClick={this.handleToggleEdit}>{row[item.prop]}</div>
          }
        }
      }
    })
  },
  methods: {
    // 取消上传
    handleCancel() {
      this.tableData = []
      this.total = 0
      document.getElementsByName('file')[0].value = ''
      this.dialogVisible = false
    },
    // 确认上传
    handleConfirm() {
      this.mergeTable()
      this.$emit('upload', this.dbData)
    },
    // 编辑，查看切换
    handleToggleEdit() {
      this.isEdit = !this.isEdit
      // 将tableData的数据合并到dbData上
      if (!this.isEdit) {
        this.mergeTable()
      }
    },
    // 将tableData合并到dbData
    mergeTable() {
      const { size, current } = this.queryParams
      console.log('this.tableData', this.tableData)
      const mergeData = this.tableData.map(item => {
        return {
          ...item,
          index: undefined
        }
      })
      this.dbData.splice((current - 1) * size, size, ...mergeData)
    },
    // 下载模板
    downLoadExcel() {
      if (!this.downLoadUrl) {
        return this.$message.warning('请填写正确的模板链接')
      }
      const url = encodeURI(this.downLoadUrl)
      window.open(url)
    },
    // 加载分页数据
    loadData() {
      const { size, current } = this.queryParams
      this.tableData = this.dbData.slice((current - 1) * size, current * size).map((item, index) => {
        item.index = index
        return item
      })
    },
    // 重新加载
    reloadData({ type, pageSize: size, currentPage }) {
      if (type === 'size-change') {
        // 分页条数变更，需要重置current为1
        this.queryParams = merge(this.queryParams, { size, current: 1 })
      } else {
        // 页码变更时
        this.queryParams = merge(this.queryParams, { current: currentPage })
      }
      this.loadData()
      this.mergeTable()
    },
    // 格式化dbData， 将excel文件的内容，转成后端需要的格式
    formatDbData(dbData) {
      if (!Array.isArray(dbData)) {
        throw new TypeError('传入类型不是Array类型')
      }
      const res = dbData.map(item => {
        const obj = {}
        Object.keys(item).forEach(key => {
          // 查找与key相同的column
          const column = find(this.columns, col => {
            return col.label === key
          })
          if (column) {
            obj[column.prop] = item[key]
          }
        })
        return obj
      })
      return res
    },
    // 选择文件
    httpRequest(e) {
      this.tableData = []
      const file = e.file // 文件信息
      if (!file) {
        // 没有文件
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }

      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary' // 以字符编码的方式解析
          })
          const exlname = workbook.SheetNames[0] // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          // 将 JSON 数据挂到 data 里
          this.dbData = this.formatDbData(exl)
          this.loadData()
          this.total = this.dbData.length
          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          console.log('出错了：：')
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    }
  }
}
</script>

