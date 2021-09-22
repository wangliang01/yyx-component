<template>
  <div id="product-archives-container" class="product-archives-container">
    <y-table-pro
      ref="productArchivesTabel"
      :columns="columns"
      ui-style="antd"
      :show-util-bar="true"
      :load-data-api="pagelist"
      :params.sync="paramsObj"
      :span-method="tableType==='skuColumns'?arraySpanMethod:null"
      :max-height="height"
      :format="format"
    >
      <div slot="table-top-right">
        <el-button type="primary" @click="addProduct">新建产品</el-button>
      </div>
      <div slot="table">
        <el-radio-group v-model="tableType" size="small" button-style="hollow">
          <el-radio-button label="spuColumns">SPU列表</el-radio-button>
          <el-radio-button label="skuColumns">SKU列表</el-radio-button>
        </el-radio-group>
      </div>
    </y-table-pro>
  </div>
</template>

<script>
import api from './api'
export default {
  name: 'ProductArchives',
  data() {
    return {
      show: false,
      height: '100%',
      api,
      categoryIdArr: [],
      paramsObj: { categoryCode: '23344' },
      options: [],
      tableType: 'skuColumns',
      spuColumns: [
        {
          label: '图片',
          prop: 'carouselUrls',
          render: (h, { row }) => {
            return (
              <el-image
                style='width: 50px; height: 50px'
                src={row.carouselUrls && row.carouselUrls[0]}
                preview-src-list={row.carouselUrls}>
              </el-image>
            )
          }
        },
        {
          label: 'SPU ID',
          prop: 'id'
        },
        {
          prop: 'region',
          label: '活动区域',
          fieldType: 'Select',
          filter: true,
          api() {
            return {
              code: '200',
              message: 'OK',
              success: true,
              data: [
                {
                  label: '上海',
                  value: 'shanghai'
                },
                {
                  label: '北京',
                  value: 'beijing'
                }
              ]
            }
          }
        },
        {
          label: 'SPU 名称',
          prop: 'name'
        }, {
          label: 'SPU',
          prop: 'idOrName',
          filter: true,
          fieldType: 'Input',
          placeholder: '请输入SPU ID/名称',
          hidden: true
        }, {
          label: '后台类目',
          prop: 'categoryName',
          filter: {
            render: (h) => {
              return <el-cascader clearable v-model={this.categoryIdArr} options={this.options} propsProps={{ value: 'id', label: 'name' }}></el-cascader>
            }
          }

        }, {
          label: '类型',
          prop: 'isStandard',
          render: (h, { row }) => {
            return (
              <span>{row.isStandard ? '标品' : '非标品'}</span>
            )
          }
        }, {
          label: '最小销售单位',
          prop: 'baseUnit',
          render: (h, { row }) => {
            return (
              <span>{row.baseUnit?.name}</span>
            )
          }
        }, /*, {
          label: '最小规格',
          prop: 'baseUnitConversion',
          render: (h, { row }) => {
            return (
              <span>{(row.baseUnitConversion?.value || '-') + (row.baseUnitConversion?.minUnit?.name || '-') + '1/' + row.baseUnit?.name}</span>
            )
          }
        }*/ {
          label: '保质期',
          prop: 'period',
          render: (h, { row }) => {
            return (
              <span>{row.expType === 'NEVER' ? '永不过期' : row.period + { 'DAY': '天', 'MONTH': '月', 'YEAR': '年' }[row.expType]}</span>
            )
          }
        }, {
          label: '采购税率',
          prop: 'purchaseTaxRate',
          render: (h, { row }) => {
            return (
              <span>{row.purchaseTaxRate + '%'}</span>
            )
          }
        }, {
          label: '操作',
          'min-width': '150px',
          render: (h, { row }) => {
            return (
              <div>
                <el-button
                  type='text'
                  onClick={() => this.handleEditSpu(row)}>编辑</el-button>
                <el-button
                  type='text'
                  onClick={() => this.handleSeeSpu(row)}>查看</el-button>
                <el-button
                  type='text'
                  onClick={() => this.handleAddSku(row)}>新建SKU</el-button>
              </div>
            )
          }
        }
      ],
      skuColumns: [
        {
          prop: 'categoryCode',
          noReset: true,
          hidden: true
        },
        {
          label: 'SPU ID',
          prop: 'spuId'
        },
        {
          label: 'TestA',
          prop: 'testA'
        },
        {
          label: 'SKU ID',
          prop: 'skuId'
        }, {
          label: 'SKU 名称',
          prop: 'skuName'
        }, {
          label: 'SPU',
          prop: 'spuIdrName',
          filter: true,
          fieldType: 'Input',
          placeholder: '请输入SKU ID/名称',
          hidden: true
        }, {
          label: 'SKU',
          prop: 'idrName',
          filter: true,
          noReset: true,
          fieldType: 'Input',
          placeholder: '请输入SKU ID/名称',
          hidden: true
        }, {
          label: '后台类目',
          prop: 'categoryFullName',
          filter: {
            render: (h) => {
              return <el-cascader clearable v-model={this.categoryIdArr} options={this.options} propsProps={{ value: 'id', label: 'name' }}></el-cascader>
            }
          }
        }, {
          label: '级别',
          prop: 'gradeName'
        }, {
          label: '包规描述',
          prop: 'skuSpec',
          render: (h, { row }) => {
            return (
              <span>{this.getSpecName(row) }</span>
            )
          }
        }, {
          label: '状态',
          prop: 'isActive',
          filter: true,
          'render-header': (h, { row }) => {
            return (
              <span>状态<y-tips style='margin-left:8px'> 生效：商品中心、供应商/POP可以关联<br/>失效：商品中心、供应商/POP不可关联</y-tips></span>
            )
          },
          fieldType: 'Select',
          options: [{ label: '生效', value: true }, { label: '失效', value: false }],
          render: (h, { row }) => {
            return (
              <div>
                <el-switch
                  v-model={row.isActive} onChange={() => this.handleChangeActive(row)}>
                </el-switch>
                <span style='margin-left:7px'>{row.isActive ? '生效' : '失效'}</span>
              </div>
            )
          }
        }, {
          label: '操作',
          'min-width': '90px',
          render: (h, { row }) => {
            return (
              <div>
                <el-button
                  type='text'
                  onClick={() => this.handleEditSku(row)}>编辑</el-button>
                <el-button
                  type='text'
                  onClick={() => this.handleSeeSku(row)}>查看</el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  computed: {
    columns() {
      return this[this.tableType]
    },
    pagelist() {
      if (this.tableType === 'skuColumns') {
        return this.api.productApi.getSkuPackage
      } else {
        return this.api.productApi.getSpu
      }
    }
  },
  watch: {
    categoryIdArr(v) {
      if (!v.length) {
        this.paramsObj.categoryCode = ''
      } else {
        this.paramsObj.categoryCode = v[v.length - 1]
      }
    },
    'paramsObj.categoryCode'(v, oldv) {
      if (v === '' && v !== oldv) {
        this.categoryIdArr = []
      }
    }
  },
  created() {
    this.height = document.body.offsetHeight - 340 - 16 + 'px'

    this.api.productApi.getCategories().then((data) => {
      this.options = JSON.parse(JSON.stringify(data.data))
    })

    console.log('height', this.height)
  },
  mounted() {
  },
  methods: {
    format(tableData) {
      return tableData.map(item => {
        return {
          ...item,
          testA: 'A',
          testB: 'B'
        }
      })
    },
    getSpecName(row) {
      let str = ''
      if (row.pageckSpec && row.pageckSpecValue) {
        str = row.pageckSpecValue + '' + row.saleUnit + '/' + row.pageckSpec
      } else {
        str = '1' + row.saleUnit
      }
      return str
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.packageSpecificationList) {
        const isFirst = row.pageckSpecId === row.packageSpecificationList[0].id
        const packageLen = row.packageSpecificationList.length
        if (columnIndex < 5) {
          if (isFirst) {
            return {
              rowspan: packageLen,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    },
    async handleChangeActive(row) {
      try {
        const params = {
          isActive: row.isActive
        }
        await this.api.productApi.setStatusBySku(row.pageckSpecId, params)
        this.$message.success('修改状态成功')
      } catch (e) {
        row.isActive = !row.isActive
      }
    },
    handleEditSpu(row) {
      this.$router.push({ name: 'productArchivesAddSpu', query: { p: row.id }})
    },
    handleSeeSpu(row) {
      this.$router.push({ name: 'productArchivesSpuDetails', query: { p: row.id }})
    },
    handleAddSku(row) {
      this.$router.push({ name: 'productArchivesAddSku', query: { p: row.id }})
    },
    handleEditSku(row) {
      this.$router.push({ name: 'productArchivesAddSku', query: { k: row.skuId }})
    },
    handleSeeSku(row) {
      this.$router.push({ name: 'productArchivesSkuDetails', query: { k: row.skuId }})
    },
    addProduct() {
      this.$router.push({ name: 'productArchivesAddSpu' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-archives-container{
    height: 100%;
    overflow: hidden;
    padding: 0px 16px 16px 16px;
    box-sizing: border-box;
    .placeholder{
      height: 97px;
      background-color: #fff;
    }
  }
</style>
