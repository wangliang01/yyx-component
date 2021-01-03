((typeof self !== 'undefined' ? self : this)["webpackJsonpyui"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpyui"] || []).push([[4],{

/***/ "ba9f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"56e5d1ac-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./examples/views/table-pro/index.vue?vue&type=template&id=63fbc282&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"table-pro"},[_c('h1',[_vm._v("高级表格")]),_c('el-card',[_c('h2',[_vm._v("自定义列模板")]),_c('p',[_vm._v("自定义列的显示内容，可组合其他组件使用。")]),_c('y-table',{attrs:{"data":_vm.tableData,"columns":_vm.customerColumns}})],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("展开行")]),_c('p',[_vm._v("当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。")]),_c('y-table',{attrs:{"data":_vm.expandTableData,"columns":_vm.expandColumns}})],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("筛选")]),_c('p',[_vm._v("对表格进行筛选，可快速查找到自己想看的数据。")]),_c('y-table',{ref:"filterTable",attrs:{"data":_vm.tableData,"columns":_vm.filterColumns}},[_c('el-button',{on:{"click":_vm.resetDateFilter}},[_vm._v("清除日期过滤器")]),_c('el-button',{on:{"click":_vm.clearFilter}},[_vm._v("清除所有过滤器")])],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("树形数据与懒加载")]),_c('y-table',{attrs:{"data":_vm.treeTableData,"columns":_vm.treeColumns,"row-key":"id","border":"","tree-props":{children: 'children', hasChildren: 'hasChildren'},"default-expand-all":""}})],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("树形数据与懒加载")]),_c('el-table',{attrs:{"data":_vm.treeTableData,"row-key":"id","border":"","default-expand-all":"","tree-props":{children: 'children', hasChildren: 'hasChildren'}}},[_c('el-table-column',{attrs:{"prop":"date","label":"日期","sortable":"","width":"180"}}),_c('el-table-column',{attrs:{"prop":"name","label":"姓名","sortable":"","width":"180"}}),_c('el-table-column',{attrs:{"prop":"address","label":"地址"}})],1)],1),_c('el-card',[_c('h2',[_vm._v("自定义表头")]),_c('p',[_vm._v("表头支持自定义。")])])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./examples/views/table-pro/index.vue?vue&type=template&id=63fbc282&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./examples/views/table-pro/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var table_provue_type_script_lang_js_ = ({
  name: 'TablePro',
  data: function data() {
    var _this = this;

    var h = this.$createElement;
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }],
      filterColumns: [{
        label: '日期',
        prop: 'date',
        sortable: true,
        width: '180',
        columnKey: 'date',
        filters: [{
          text: '2016-05-01',
          value: '2016-05-01'
        }, {
          text: '2016-05-02',
          value: '2016-05-02'
        }, {
          text: '2016-05-03',
          value: '2016-05-03'
        }, {
          text: '2016-05-04',
          value: '2016-05-04'
        }],
        filterMethod: this.filterHandler
      }, {
        label: '姓名',
        prop: 'name'
      }, {
        label: '地址',
        prop: 'address'
      }, {
        label: 'tag',
        prop: 'tag',
        width: '100',
        filters: [{
          text: '家',
          value: '家'
        }, {
          text: '公司',
          value: '公司'
        }],
        filterMethod: this.filterTag,
        filterPlacement: 'bottom-end',
        render: function render(h, _ref) {
          var row = _ref.row,
              col = _ref.col;
          return h("el-tag", {
            "attrs": {
              "type": row.tag === '家' ? 'primary' : 'success',
              "disable-transitions": true
            }
          }, [row.tag]);
        }
      }],
      customerColumns: [{
        prop: 'date',
        label: '日期',
        render: function render(h, _ref2) {
          var row = _ref2.row;
          return h("div", [h("i", {
            "class": 'el-icon-time'
          }), h("span", {
            "style": 'margin-left: 10px'
          }, [row.date])]);
        }
      }, {
        prop: 'name',
        label: '姓名',
        render: function render(h, _ref3) {
          var row = _ref3.row;
          return h("el-popover", {
            "attrs": {
              "trigger": 'hover',
              "placement": 'top'
            }
          }, [h("p", ["\u59D3\u540D: ", row.name]), h("p", ["\u4F4F\u5740: ", row.address]), h("div", {
            "slot": 'reference',
            "class": 'name-wrapper'
          }, [h("el-tag", {
            "attrs": {
              "size": 'medium'
            }
          }, [row.name])])]);
        }
      }, {
        label: '操作',
        render: function render(h, _ref4) {
          var row = _ref4.row;
          return h("div", [h("el-button", {
            "attrs": {
              "size": 'mini'
            },
            "on": {
              "click": function click() {
                return _this.handleEdit(row);
              }
            }
          }, ["\u7F16\u8F91"]), h("el-button", {
            "attrs": {
              "size": 'mini',
              "type": 'danger'
            },
            "on": {
              "click": function click() {
                return _this.handleDelete(row);
              }
            }
          }, ["\u5220\u9664"])]);
        }
      }],
      expandTableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      expandColumns: [{
        type: 'expand',
        render: function render(h, props) {
          return h("el-form", {
            "attrs": {
              "label-position": 'left'
            }
          }, [h("el-form-item", {
            "attrs": {
              "label": '商品名称'
            }
          }, [h("span", [props.row.name])]), h("el-form-item", {
            "attrs": {
              "label": '所属店铺'
            }
          }, [h("span", [props.row.shop])]), h("el-form-item", {
            "attrs": {
              "label": '商品 ID'
            }
          }, [h("span", [props.row.id])]), h("el-form-item", {
            "attrs": {
              "label": '店铺 ID'
            }
          }, [h("span", [props.row.shopId])]), h("el-form-item", {
            "attrs": {
              "label": '商品分类'
            }
          }, [h("span", [props.row.category])]), h("el-form-item", {
            "attrs": {
              "label": '店铺地址'
            }
          }, [h("span", [props.row.address])]), h("el-form-item", {
            "attrs": {
              "label": '商品描述'
            }
          }, [h("span", [props.row.desc])])]);
        }
      }, {
        prop: 'id',
        label: '商品ID'
      }, {
        prop: 'name',
        label: '商品名称'
      }, {
        prop: 'desc',
        label: '商品描述'
      }],
      columns: [{
        label: 'ID',
        prop: 'id',
        fieldType: 'Input',
        filter: true,
        cols: 3,
        sm: 6
      }, {
        label: '姓名',
        prop: 'name',
        fieldType: 'Input',
        filter: true,
        cols: 3,
        sm: 6
      }, {
        label: '年龄',
        prop: 'age',
        fieldType: 'Input',
        filter: true,
        cols: 3,
        sm: 6
      }],
      treeTableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      treeColumns: [{
        label: '日期',
        prop: 'date',
        sortable: true,
        width: '180',
        columnKey: 'id'
      }, {
        label: '姓名',
        prop: 'name',
        sortable: true,
        width: '180'
      }, {
        label: '地址',
        prop: 'address'
      }]
    };
  },
  props: {},
  components: {},
  mounted: function mounted() {},
  methods: {
    handleEdit: function handleEdit(row) {},
    handleDelete: function handleDelete(row) {},
    resetDateFilter: function resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter: function clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter: function formatter(row, column) {
      return row.address;
    },
    filterTag: function filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler: function filterHandler(value, row, column) {
      var property = column['property'];
      return row[property] === value;
    }
  }
});
// CONCATENATED MODULE: ./examples/views/table-pro/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_table_provue_type_script_lang_js_ = (table_provue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./examples/views/table-pro/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_table_provue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "63fbc282",
  null
  
)

/* harmony default export */ var table_pro = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=yui.common.4.js.map