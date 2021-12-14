## TablePro 高级表格

高级表格包含筛选器，表格，分页功能，可能通过配置快速生成页面。

### 基本用法

::: demo

```html
<template>
  <div id="product-archives-container" class="product-archives-container">
    <y-table-pro
      v-adaptive="{bottomOffset: 90}"
      :columns="columns"
      ui-style="antd"
      :show-util-bar="false"
      :load-data-api="pagelist"
      loaded="handleLoadData"
    >
      <div slot="table">
        <el-button>xx33333333333333333333</el-button>
      </div>
      <div slot="table-top-right">
        <el-button>xx光线</el-button>
      </div>
    </y-table-pro>
  </div>
</template>
<script>
  const api = {
    productApi: {
      async getSpu() {
        return {
          code: '200',
          success: true,
          data: {
            size: '10',
            current: '1',
            total: '25',
            records: [
              {
                id: '1422463042979045378',
                categoryId: '1422437265035866117',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目e',
                name: '444',
                tempArea: {
                  id: '1422458185786269698',
                  code: 'ae00def8-ecaa-4541-aeed-7374103074e8',
                  name: '18'
                },
                saleTaxRate: '2.00',
                purchaseTaxRate: '2.00',
                expType: 'DAY',
                period: 4,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422458486849216514',
                  name: 'Hdey',
                  brandCode: 'b7e16a32-9fd0-4c48-a31b-806c90e3e7e3'
                },
                madeInPlace: '410000,410300,410323',
                madeInPlaceCode: true,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/ee95f6e2936c32ab7b6167a22de39d3c.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/431a520268b9280edadc6448aef2563d.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/5fa2efab364f62c5c71f14b31d8da841.png'
                ],
                descUrls: null,
                detailUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png'
                ],
                skuList: null,
                description: '33333333'
              },
              {
                id: '1422463150848155649',
                categoryId: '1422437265035866117',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目e',
                name: '444',
                tempArea: {
                  id: '1422458222557732866',
                  code: 'c32abc10-bb14-4c7d-a7d9-65c886f4d937',
                  name: '-25'
                },
                saleTaxRate: '1.00',
                purchaseTaxRate: '1.00',
                expType: 'DAY',
                period: 1,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422458486849216514',
                  name: 'Hdey',
                  brandCode: 'b7e16a32-9fd0-4c48-a31b-806c90e3e7e3'
                },
                madeInPlace: '410000,410300,410324',
                madeInPlaceCode: true,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/ee95f6e2936c32ab7b6167a22de39d3c.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/431a520268b9280edadc6448aef2563d.png'
                ],
                descUrls: null,
                detailUrls: null,
                skuList: null,
                description: ''
              },
              {
                id: '1422497994160414721',
                categoryId: '1422437265035866117',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目e',
                name: '222',
                tempArea: {
                  id: '1422458185786269698',
                  code: 'ae00def8-ecaa-4541-aeed-7374103074e8',
                  name: '18'
                },
                saleTaxRate: '0.00',
                purchaseTaxRate: '2.00',
                expType: 'YEAR',
                period: 0,
                isStandard: true,
                baseUnit: {
                  id: '1422459685010874370',
                  code: 'c877f276-d82b-4a6c-86a1-68dcea691e98',
                  name: '千克'
                },
                brand: {
                  id: '1422458486849216514',
                  name: 'Hdey',
                  brandCode: 'b7e16a32-9fd0-4c48-a31b-806c90e3e7e3'
                },
                madeInPlace: '',
                madeInPlaceCode: false,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/9f23a26ddcc3fe1b7d8516758f19b28a.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/ee95f6e2936c32ab7b6167a22de39d3c.png'
                ],
                descUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/327a3c678a5665af5cf5257cee4663f7.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/c0775a2cb742f6643806032e07afa97a.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/3559559b8580a273093af7168f962ed2.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/9f23a26ddcc3fe1b7d8516758f19b28a.png'
                ],
                detailUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/5fa2efab364f62c5c71f14b31d8da841.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png',
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/431a520268b9280edadc6448aef2563d.png'
                ],
                skuList: null,
                description: '1'
              },
              {
                id: '1422811726115708929',
                categoryId: '1422808305012420614',
                categoryName:
                  '小苹果一/小苹果二/小苹果三/小苹果四/小苹果五/小苹果六',
                name: '苹果',
                tempArea: {
                  id: '1422458156954624001',
                  code: '09382dcf-d79b-4c8b-97a2-09950b7b37ce',
                  name: '5'
                },
                saleTaxRate: '0.01',
                purchaseTaxRate: '0.01',
                expType: 'DAY',
                period: 100,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422459757840769025',
                  name: '新希望',
                  brandCode: 'd129e31e-5f65-4ddc-996f-ec5780711ea9'
                },
                madeInPlace: '',
                madeInPlaceCode: true,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/7723e0495af4d5cd1a609bfc5a2e0249.png'
                ],
                descUrls: null,
                detailUrls: null,
                skuList: null,
                description: ''
              },
              {
                id: '1422821757146046466',
                categoryId: '1422808305012420614',
                categoryName:
                  '小苹果一/小苹果二/小苹果三/小苹果四/小苹果五/小苹果六',
                name: '小苹果',
                tempArea: {
                  id: '1422458185786269698',
                  code: 'ae00def8-ecaa-4541-aeed-7374103074e8',
                  name: '18'
                },
                saleTaxRate: '0.01',
                purchaseTaxRate: '0.01',
                expType: 'DAY',
                period: 100,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422459757840769025',
                  name: '新希望',
                  brandCode: 'd129e31e-5f65-4ddc-996f-ec5780711ea9'
                },
                madeInPlace: '',
                madeInPlaceCode: true,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/7723e0495af4d5cd1a609bfc5a2e0249.png'
                ],
                descUrls: null,
                detailUrls: null,
                skuList: null,
                description: ''
              },
              {
                id: '1422822607767674882',
                categoryId: '1422437265035866117',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目e',
                name: 'SPU804我问问1',
                tempArea: {
                  id: '1422458156954624001',
                  code: '09382dcf-d79b-4c8b-97a2-09950b7b37ce',
                  name: '5'
                },
                saleTaxRate: '1.00',
                purchaseTaxRate: '1.00',
                expType: 'DAY',
                period: 3,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422459757840769025',
                  name: '新希望',
                  brandCode: 'd129e31e-5f65-4ddc-996f-ec5780711ea9'
                },
                madeInPlace: '004',
                madeInPlaceCode: false,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png'
                ],
                descUrls: null,
                detailUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/431a520268b9280edadc6448aef2563d.png'
                ],
                skuList: null,
                description: '啦啦啦啦啦'
              },
              {
                id: '1422822653552697346',
                categoryId: '1422437265035866117',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目e',
                name: 'SPU804我问问34',
                tempArea: {
                  id: '1422458156954624001',
                  code: '09382dcf-d79b-4c8b-97a2-09950b7b37ce',
                  name: '5'
                },
                saleTaxRate: '1.00',
                purchaseTaxRate: '1.00',
                expType: 'DAY',
                period: 3,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422459757840769025',
                  name: '新希望',
                  brandCode: 'd129e31e-5f65-4ddc-996f-ec5780711ea9'
                },
                madeInPlace: '004',
                madeInPlaceCode: false,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png'
                ],
                descUrls: null,
                detailUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/431a520268b9280edadc6448aef2563d.png'
                ],
                skuList: null,
                description: '啦啦啦啦啦'
              },
              {
                id: '1422822661991636994',
                categoryId: '1422437265035866117',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目e',
                name: 'SPU804我问问12',
                tempArea: {
                  id: '1422458156954624001',
                  code: '09382dcf-d79b-4c8b-97a2-09950b7b37ce',
                  name: '5'
                },
                saleTaxRate: '1.00',
                purchaseTaxRate: '1.00',
                expType: 'DAY',
                period: 3,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422459757840769025',
                  name: '新希望',
                  brandCode: 'd129e31e-5f65-4ddc-996f-ec5780711ea9'
                },
                madeInPlace: '004',
                madeInPlaceCode: false,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/f8d29dc20cd704f2731bdb0dda198ec8.png'
                ],
                descUrls: null,
                detailUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/431a520268b9280edadc6448aef2563d.png'
                ],
                skuList: null,
                description: '啦啦啦啦啦'
              },
              {
                id: '1422824440221343745',
                categoryId: '1422437265035866118',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目f',
                name: 'SPU0804002',
                tempArea: {
                  id: '1422458185786269698',
                  code: 'ae00def8-ecaa-4541-aeed-7374103074e8',
                  name: '18'
                },
                saleTaxRate: '1.00',
                purchaseTaxRate: '1.00',
                expType: 'DAY',
                period: 4,
                isStandard: true,
                baseUnit: {
                  id: '1422458461524008961',
                  code: 'b58a0edb-1c51-4e6f-a1b4-9aac8330d92c',
                  name: '克'
                },
                brand: {
                  id: '1422459757840769025',
                  name: '新希望',
                  brandCode: 'd129e31e-5f65-4ddc-996f-ec5780711ea9'
                },
                madeInPlace: '008',
                madeInPlaceCode: false,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/327a3c678a5665af5cf5257cee4663f7.png'
                ],
                descUrls: null,
                detailUrls: null,
                skuList: null,
                description:
                  '备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注说明测试备注'
              },
              {
                id: '1422826534173089793',
                categoryId: '1422437265035866118',
                categoryName:
                  '一级类目A/二级类目a/三级类目b/四级类目c/五级类目d/六级类目f',
                name: 'SPU08040033',
                tempArea: {
                  id: '1422458185786269698',
                  code: 'ae00def8-ecaa-4541-aeed-7374103074e8',
                  name: '18'
                },
                saleTaxRate: '2.00',
                purchaseTaxRate: '2.00',
                expType: 'DAY',
                period: 5,
                isStandard: false,
                baseUnit: {
                  id: '1422459685010874370',
                  code: 'c877f276-d82b-4a6c-86a1-68dcea691e98',
                  name: '千克'
                },
                brand: {
                  id: '1422458486849216514',
                  name: 'Hdey',
                  brandCode: 'b7e16a32-9fd0-4c48-a31b-806c90e3e7e3'
                },
                madeInPlace: '440000,440600,440608',
                madeInPlaceCode: true,
                madeInPlaceName: null,
                properties: [],
                carouselUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/9f23a26ddcc3fe1b7d8516758f19b28a.png'
                ],
                descUrls: null,
                detailUrls: [
                  'https://yyx-temp.oss-cn-chengdu.aliyuncs.com/1420284071384186880/image/png/9f23a26ddcc3fe1b7d8516758f19b28a.png'
                ],
                skuList: null,
                description: '实打实大苏打'
              }
            ]
          },
          msg: '操作成功'
        }
      }
    }
  }
  export default {
    name: 'ProductArchives',
    data() {
      return {
        pagelist: api.productApi.getSpu,
        columns: [
          {
            label: '图片',
            prop: 'carouselUrls',
            render: (h, { row }) => {
              return (
                <el-image
                  style="width: 50px; height: 50px"
                  src={row.carouselUrls && row.carouselUrls[0]}
                  preview-src-list={row.carouselUrls}
                ></el-image>
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
            fieldType: 'y-select',
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
          },
          {
            label: 'SPU',
            prop: 'idOrName',
            filter: true,
            fieldType: 'Input',
            placeholder: '请输入SPU ID/名称',
            hidden: true
          },
          {
            label: '后台类目',
            prop: 'categoryName'
          },
          {
            label: '类型',
            prop: 'isStandard',
            render: (h, { row }) => {
              return <span>{row.isStandard ? '标品' : '非标品'}</span>
            }
          },
          {
            label: '最小销售单位',
            prop: 'baseUnit',
            render: (h, { row }) => {
              return <span>{row.baseUnit?.name}</span>
            }
          },
          {
            label: '保质期',
            prop: 'period',
            render: (h, { row }) => {
              return (
                <span>
                  {row.expType === 'NEVER'
                    ? '永不过期'
                    : row.period +
                      { DAY: '天', MONTH: '月', YEAR: '年' }[row.expType]}
                </span>
              )
            }
          },
          {
            label: '采购税率',
            prop: 'purchaseTaxRate',
            render: (h, { row }) => {
              return <span>{row.purchaseTaxRate + '%'}</span>
            }
          },
          {
            label: '操作',
            'min-width': '150px',
            render: (h, { row }) => {
              return (
                <div>
                  <el-button
                    type="text"
                    onClick={() => this.handleEditSpu(row)}
                  >
                    编辑
                  </el-button>
                  <el-button type="text" onClick={() => this.handleSeeSpu(row)}>
                    查看
                  </el-button>
                  <el-button type="text" onClick={() => this.handleAddSku(row)}>
                    新建SKU
                  </el-button>
                </div>
              )
            }
          }
        ]
      }
    },
    methods: {
      handleLoadData(data) {
        console.log('loaded', data)
      }
    }
  }
</script>
<style>
  .product-archives-container {
    height: 100%;
  }
</style>
```

:::

### Attribures

| 参数        | 说明                                                       | 类型            | 可选值       | 默认值                                        |
| ----------- | ---------------------------------------------------------- | --------------- | ------------ | --------------------------------------------- |
| loadDataApi | 加载数据 Api                                               | Function        | ——           | ——                                            |
| columns     | 表格列，同 table-column 属性                               | Array           | ——           | ——                                            |
| hasSearch   | 是否显示查询按钮                                           | Boolean         | ——           | true                                          |
| hasReset    | 是否显示重置按钮                                           | Boolean         | ——           | true                                          |
| params      | 通过页面传递给 api 的参数                                  | Object          | ——           | ——                                            |
| uiStyle     | UI 风格                                                    | String          | element,antd | element                                       |
| offset      | ——                                                         | String, Number  | ——           | 200                                           |
| rowKey      | 当表格需要勾选操作时，传递的 rowKey,同 el-table 的 row-key | String,Function | ——           | 'id'                                          |
| lazyLoad    | 数据懒加载，当进行组件时，先不加载数据                     | Boolean         | ——           | false                                         |
| model       | 接口返回数据模型                                           | Object          | ——           | { data: 'data.records', total: 'data.total' } |
| format      | 对接口返回的数据进行格式化处理                             | Function        | ——           | ——                                            |
