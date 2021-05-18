<template>
  <div class="batch-import">
    <!-- 按钮 -->
    <el-button
      :type="$attrs.type"
      icon="el-icon-upload"
      @click="dialogVisible=true"
    >{{ btnText }}</el-button>
    <!-- 按钮 end -->

    <!-- 弹窗  -->
    <el-dialog
      :title="btnText"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      modal-append-to-body
      lock-scroll
      destroy-on-close
      width="92%"
      :before-close="handleBeforeClose"
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
          slot="tip"
          class="el-upload__tip mt-10"
        >
          只能上传excel文件<span v-if="size">，且不超过{{ size }}kb</span>
          <el-link
            class="template"
            type="primary"
            :href="downloadUrl"
          >下载模板</el-link>
        </div>
      </el-upload>
      <el-button-group>
        <el-button
          v-if="tableData.length"
          class="mt-10"
          @click="handleToggleEdit"
        >{{ !isEdit ?'编辑数据' : '查看数据' }}</el-button>
      </el-button-group>

      <y-table
        class="mt-10"
        :max-height="312"
        :data="tableData"
        :columns="currentColumns"
        :pagination="importPagination"
        :total="total"
        :reload="reloadData"
        :col-index="1"
        @mouseleave="hadden"
      ></y-table>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!total"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗 end -->
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { merge, find, isEmpty, cloneDeep } from 'lodash'
import { Message } from 'element-ui'
import moment from 'moment'
// import Vue from 'vue'
export default {
  name: 'YBatchImport',
  props: {
    btnText: {
      type: String,
      default: '批量导入'
    },
    size: {
      type: [String, Number],
      default: 0
    },
    downloadUrl: {
      type: String,
      required: true
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
      isEdit: false,
      importPagination: {
        small: false,
        background: false,
        'page-size': 10,
        total: 0,
        'page-count': 0,
        'pager-count': 7,
        'current-page': 1,
        layout: 'total, sizes, prev, pager, next, jumper',
        'page-sizes': [10, 20],
        'popper-class': '',
        'prev-text': '',
        'next-text': '',
        disabled: false,
        'hide-on-single-page': false
      }

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
          this.isEdit = false
          this.$forceUpdate()
        }
      },
      deep: true,
      immediate: true
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
              return <y-input v-model={this.tableData[row.index][item.prop]} size='small' maxLength={item.maxLength} clearable rules={row.rules} number={!!item.number} integer={!!item.integer} integerDigit={item.integerDigit} precision={item.precision}></y-input>
            } else if (item.type === 'select') {
              return <el-select ref='select' v-model={this.tableData[row.index][item.prop]} size='small' clearable rules={row.rules}>
                {item.options.map((option) => {
                  return <el-option key={option.value}
                    label={option.label}
                    value={option.value}>
                  </el-option>
                })}
              </el-select>
            } else if (item.type === 'date-picker') {
              this.tableData[row.index][item.prop] = (moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD') === 'Invalid date' ? '' : moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD'))
              return <el-date-picker
                style={{ width: '95%', display: 'block' }}
                v-model={this.tableData[row.index][item.prop]}
                type='date'
                size='small'
                onChange={() => { this.tableData[row.index][item.prop] = (moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD') === 'Invalid date' ? '' : moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD')) }}
                placeholder='选择日期'>
              </el-date-picker>
            } else if (item.type === 'date-picker-time') {
              this.tableData[row.index][item.prop] = moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date' ? '' : moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD HH:mm:ss')
              return <el-date-picker
                style={{ width: '95%', display: 'block' }}
                v-model={this.tableData[row.index][item.prop]}
                type='datetime'
                size='small'
                onChange={() => { this.tableData[row.index][item.prop] = moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD HH:mm:ss') === 'Invalid date' ? '' : moment(this.tableData[row.index][item.prop]).format('YYYY-MM-DD HH:mm:ss') }}
                placeholder='选择日期'>
              </el-date-picker>
            } else if (item.type === 'input-number') {
              return <YInputNumber v-model={this.tableData[row.index][item.prop]} min={item.min} max={item.max} size='small' clearable rules={row.rules}></YInputNumber>
            }
          } else {
            return <div onClick={this.handleToggleEdit}>{row[item.prop]}</div>
          }
        }
      }
    })
  },
  methods: {
    // 滑动隐藏下拉框
    hadden() {
      this.$refs.select.blur()
    },
    // 校验数据
    validate(data) {
      // 校验之前，先把index加入到tableData
      this.loadData()
      return new Promise((resolve, reject) => {
        data.forEach((item, index) => {
          Object.keys(item).forEach(key => {
            // 查找与当前key匹配的column
            const column = find(this.columns, (col) => {
              return col.prop === key
            })
            if (!isEmpty(column)) {
              // column存在,relationProp:需要某一项为真时，才校验
              if (column.required && (!column.relationProp || (column.relationProp && item[column.relationProp]) === '是')) {
                // 如果required有值，则需要校验
                if (item[key] === '' || item[key] === undefined || item[key] === null) {
                  // 如果没有值，则提示报错
                  reject(`第${index + 1}行[${column.label}] 值不能为空`)
                }
              }
              if (column.pattern && item[key]) {
                // 如果有值，须满足规则
                if (!new RegExp(column.pattern).test(item[key])) {
                  if (column.message) {
                    reject(`第${index + 1}行的[${column.label}]${column.message}`)
                  } else {
                    reject(`第${index + 1}行的[${column.label}] 值格式不正确`)
                  }
                }
              }
              // 如果有最大值限制
              if (column.max) {
                if (item[key] > column.max) {
                  // 如果没有值，则提示报错
                  reject(`第${index + 1}行[${column.label}] 值不能大于${column.max}`)
                }
              }
              // 如果有最小值限制
              if (column.max) {
                if (item[key] < column.min) {
                  // 如果没有值，则提示报错
                  reject(`第${index + 1}行[${column.label}] 值不能小于${column.min}`)
                }
              }
              // 如果有最大长度值限制
              if (column.maxLength) {
                if (item[key].length > column.maxLength) {
                  // 如果没有值，则提示报错
                  reject(`第${index + 1}行[${column.label}] 值长度不能大于${column.maxLength}位`)
                }
              }
              // 如果下拉框的不存在
              if (column.options) {
                if (!column.options.find((option) => option.value === item[key])) {
                  // 如果没有值，则提示报错
                  reject(`第${index + 1}行[${column.label}] 值不存在于选择项中`)
                }
              }
            }
          })
        })
        resolve(true)
      })
    },
    // 关闭弹窗
    handleBeforeClose(done) {
      this.handleCancel()
      done()
    },
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
      this.validate(this.dbData).then(valid => {
        if (valid) {
          this.$emit('upload', cloneDeep(this.dbData))
        }
      }).catch(err => {
        this.$message.warning(err)
      })
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
      const mergeData = this.tableData.map(item => {
        delete item.index
        return item
      })
      this.dbData.splice((current - 1) * size, size, ...mergeData)
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
      // 先保存当前页面的修改
      this.mergeTable()
      if (type === 'size-change') {
        // 分页条数变更，需要重置current为1
        this.queryParams = merge(this.queryParams, { size, current: 1 })
      } else {
        // 页码变更时
        this.queryParams = merge(this.queryParams, { current: currentPage })
      }
      this.loadData()
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
            return col.label.trim().includes(key)
          })
          if (column) {
            obj[column.prop] = item[key]
          } else {
            throw new TypeError('上传文件不正确，不符合模板格式，请检查后上传！')
          }
        })
        return obj
      })
      return res
    },
    initData() {
      this.tableData = []
      this.total = 0
      this.queryParams = {
        current: 1,
        size: 10
      }
    },
    // 选择文件
    httpRequest(e) {
      this.initData()
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
          const exlname = this.sheetName || workbook.SheetNames[0] // 根据传人的表名读取，否则读第一张
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname], { defval: '' }) // 生成json表格内容
          if (!exl) {
            this.$message.error('未找到对应表格，请重新上传！')
            return false
          }
          // 将 JSON 数据挂到 data 里
          this.dbData = this.formatDbData(exl)
          this.loadData()
          this.total = this.dbData.length
          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          Message({
            showClose: true,
            message: e.message,
            type: 'error'
          })
          console.log('出错了', e.message)
          this.initData()
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    }
  }
}
</script>
<style lang="scss" scoped>
.batch-import {
  display: inline-block;
  margin-left: 10px;
}
.mt-10 {
  margin-top: 10px;
}
.template {
  position: relative;
  margin-left: 10px;
  top: -1px;
}
</style>

