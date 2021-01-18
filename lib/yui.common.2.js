((typeof self !== 'undefined' ? self : this)["webpackJsonpyui"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpyui"] || []).push([[2],{

/***/ "278c":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__("c135");

var iterableToArrayLimit = __webpack_require__("9b42");

var unsupportedIterableToArray = __webpack_require__("6613");

var nonIterableRest = __webpack_require__("c240");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "66ed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"03974717-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./examples/views/form/index.vue?vue&type=template&id=7063ca24&scoped=true&
var formvue_type_template_id_7063ca24_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-card',[_c('h2',[_vm._v("典型表单")]),_c('p',[_vm._v("包括各种表单项，比如输入框，选择器，开关，单选框，多选框等")]),_c('el-card',[_c('y-form',{attrs:{"config":_vm.config,"label-position":"left","width":"500px","label-width":"100px"},model:{value:(_vm.form),callback:function ($$v) {_vm.form=$$v},expression:"form"}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.handleCreate}},[_vm._v("立即创建")]),_c('el-button',{on:{"click":_vm.handleCancel}},[_vm._v("取消")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("行内表单")]),_c('p',[_vm._v("当垂直方向空间受限且表单较简单时，可以在一行内放置表单。")]),_c('el-card',[_c('y-form',{attrs:{"inline":true,"config":_vm.configInline,"label-position":"left","label-width":"100px","cols":8},model:{value:(_vm.formInline),callback:function ($$v) {_vm.formInline=$$v},expression:"formInline"}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"}},[_vm._v("查询")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("对齐方式")]),_c('p',[_vm._v("根据具体目标和制约因素，选择最佳的标签对齐方式。")]),_c('el-card',[_c('el-radio-group',{attrs:{"size":"small"},model:{value:(_vm.labelPosition),callback:function ($$v) {_vm.labelPosition=$$v},expression:"labelPosition"}},[_c('el-radio-button',{attrs:{"label":"left"}},[_vm._v("左对齐")]),_c('el-radio-button',{attrs:{"label":"right"}},[_vm._v("右对齐")]),_c('el-radio-button',{attrs:{"label":"top"}},[_vm._v("顶部对齐")])],1),_c('y-form',{staticClass:"mt-20",attrs:{"config":_vm.configInline,"label-position":_vm.labelPosition,"label-width":"100px","width":"500px"},model:{value:(_vm.formInline),callback:function ($$v) {_vm.formInline=$$v},expression:"formInline"}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"}},[_vm._v("查询")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("表单验证")]),_c('p',[_vm._v("在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。")]),_c('el-card',[_c('y-form',{ref:"form",attrs:{"config":_vm.config,"label-position":"left","width":"500px","label-width":"100px","rules":_vm.rules},model:{value:(_vm.form),callback:function ($$v) {_vm.form=$$v},expression:"form"}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.handleCreate('form')}}},[_vm._v("立即创建")]),_c('el-button',{on:{"click":_vm.handleCancel}},[_vm._v("重置")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("自定义验证")]),_c('p',[_vm._v("在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。")]),_c('el-card',[_c('y-form',{ref:"ruleForm",attrs:{"config":_vm.config2,"label-position":"right","status-icon":"","width":"500px","label-width":"100px","rules":_vm.rules2},model:{value:(_vm.ruleForm),callback:function ($$v) {_vm.ruleForm=$$v},expression:"ruleForm"}},[_c('el-form-item',{attrs:{"label-width":"100px"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.submitForm('ruleForm')}}},[_vm._v("提交")]),_c('el-button',{on:{"click":function($event){return _vm.resetForm('ruleForm')}}},[_vm._v("重置")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("动态增减表单项")]),_c('el-card',[_c('y-form',{ref:"dynamicValidateForm",attrs:{"config":_vm.dynamicValidateConfig,"label-position":"right","status-icon":"","width":"500px","label-width":"100px","rules":_vm.rules2},model:{value:(_vm.dynamicValidateForm),callback:function ($$v) {_vm.dynamicValidateForm=$$v},expression:"dynamicValidateForm"}},[_c('el-form-item',{attrs:{"label-width":"100px"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.submitForm('dynamicValidateForm')}}},[_vm._v("提交")]),_c('el-button',{on:{"click":_vm.addDomain}},[_vm._v("新增域名")]),_c('el-button',{on:{"click":function($event){return _vm.resetForm('dynamicValidateForm')}}},[_vm._v("重置")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("数字类型验证")]),_c('el-card',[_c('y-form',{ref:"numberForm",attrs:{"label-width":"100px","config":_vm.numberConfig,"width":"500px"},model:{value:(_vm.numberForm),callback:function ($$v) {_vm.numberForm=$$v},expression:"numberForm"}},[_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.submitForm('numberForm')}}},[_vm._v("提交")]),_c('el-button',{on:{"click":function($event){return _vm.resetForm('numberForm')}}},[_vm._v("重置")])],1)],1)],1)],1),_c('el-card',{staticClass:"mt-20"},[_c('h2',[_vm._v("表单内组件尺寸控制")]),_c('el-card',[_c('y-form',{ref:"sizeForm",attrs:{"config":_vm.config,"label-width":"100px","width":"500px","size":"mini"},model:{value:(_vm.form),callback:function ($$v) {_vm.form=$$v},expression:"form"}},[_c('el-form-item',{attrs:{"size":"large"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.submitForm('sizeForm')}}},[_vm._v("立即创建")]),_c('el-button',{on:{"click":function($event){return _vm.resetForm('sizeForm')}}},[_vm._v("取消")])],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./examples/views/form/index.vue?vue&type=template&id=7063ca24&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__("278c");
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"03974717-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./examples/components/DomainInput.vue?vue&type=template&id=004a2be1&scoped=true&
var DomainInputvue_type_template_id_004a2be1_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"domain-input"},_vm._l((_vm.currentValue),function(item,index){return _c('el-row',{key:index,staticStyle:{"line-height":"50px"}},[_c('el-col',{attrs:{"span":19}},[_c('el-input',{on:{"input":function($event){return _vm.handleInputEvent(index, $event)}},model:{value:(item.url),callback:function ($$v) {_vm.$set(item, "url", (typeof $$v === 'string'? $$v.trim(): $$v))},expression:"item.url"}})],1),_c('el-col',{attrs:{"span":4,"offset":1}},[_c('el-button',{on:{"click":function($event){return _vm.delDomain(item)}}},[_vm._v("删除")])],1)],1)}),1)}
var DomainInputvue_type_template_id_004a2be1_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./examples/components/DomainInput.vue?vue&type=template&id=004a2be1&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./examples/components/DomainInput.vue?vue&type=script&lang=js&
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
/* harmony default export */ var DomainInputvue_type_script_lang_js_ = ({
  name: '',
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  components: {},
  mounted: function mounted() {},
  watch: {
    value: {
      handler: function handler(val) {
        this.currentValue = val;
      },
      deep: true
    }
  },
  methods: {
    delDomain: function delDomain(item) {
      this.$emit('del', item);
    },
    handleInputEvent: function handleInputEvent(index, value) {
      this.$emit('input', index, value);
    }
  }
});
// CONCATENATED MODULE: ./examples/components/DomainInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DomainInputvue_type_script_lang_js_ = (DomainInputvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./examples/components/DomainInput.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_DomainInputvue_type_script_lang_js_,
  DomainInputvue_type_template_id_004a2be1_scoped_true_render,
  DomainInputvue_type_template_id_004a2be1_scoped_true_staticRenderFns,
  false,
  null,
  "004a2be1",
  null
  
)

/* harmony default export */ var DomainInput = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./examples/views/form/index.vue?vue&type=script&lang=js&

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

/* harmony default export */ var formvue_type_script_lang_js_ = ({
  name: '',
  data: function data() {
    var _this = this;

    var h = this.$createElement;

    var checkAge = function checkAge(rule, value, callback) {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }

      setTimeout(function () {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    var validatePass = function validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (_this.ruleForm.checkPass !== '') {
          _this.$refs.ruleForm.validateField('checkPass');
        }

        callback();
      }
    };

    var validatePass2 = function validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== _this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      numberForm: {
        age: ''
      },
      numberConfig: {
        age: {
          prop: 'age',
          label: '年龄',
          fieldType: 'Input',
          rules: [{
            required: true,
            message: '年龄不能为空'
          }]
        }
      },
      dynamicValidateForm: {
        domains: [{
          url: ''
        }],
        email: ''
      },
      form: {
        name: '',
        region: '',
        date: '',
        time: '',
        delivery: false,
        startTime: '',
        endTime: '',
        type: [],
        resource: '',
        desc: ''
      },
      config: {
        name: {
          prop: 'name',
          label: '活动名称',
          fieldType: 'Input',
          labelSuffix: '：'
        },
        region: {
          prop: 'region',
          label: '活动区域',
          fieldType: 'Select',
          labelSuffix: '：',
          options: [{
            label: '上海',
            value: 'shanghai'
          }, {
            label: '北京',
            value: 'beijing'
          }]
        },
        dateRange: {
          label: '日期范围',
          fieldType: 'DatePicker',
          type: 'daterange',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '请选择结束日期',
          onPick: function onPick(value) {
            var _value = slicedToArray_default()(value, 2),
                startTime = _value[0],
                endTime = _value[1];

            _this.form.startTime = startTime;
            _this.form.endTime = endTime;
          }
        },
        date: {
          prop: 'date',
          label: '活动时间',
          fieldType: 'DatePicker',
          labelSuffix: '：',
          cols: 13
        },
        time: {
          prop: 'time',
          label: '-',
          hideLable: false,
          labelPosition: 'center',
          labelSuffix: '',
          push: 1,
          labelWidth: '25px',
          fieldType: 'TimePicker',
          cols: 10,
          pickerOptions: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        },
        delivery: {
          prop: 'delivery',
          label: '即时配送',
          fieldType: 'YSwitch',
          labelSuffix: '：'
        },
        type: {
          prop: 'type',
          fieldType: 'Checkbox',
          label: '活动性质',
          labelSuffix: '：',
          options: [{
            label: '美食/餐厅线上活动',
            name: 'type',
            cols: 12
          }, {
            label: '地推活动',
            name: 'type',
            cols: 12
          }, {
            label: '线下主题活动',
            name: 'type',
            cols: 12
          }, {
            label: '单纯品牌曝光',
            name: 'type',
            cols: 12
          }]
        },
        resource: {
          prop: 'resource',
          label: '特殊资源',
          fieldType: 'Radio',
          labelSuffix: '：',
          options: [{
            label: '线上品牌商赞助',
            cols: 12
          }, {
            label: '线下场地免费',
            cols: 12
          }]
        },
        desc: {
          prop: 'desc',
          label: '活动形式',
          fieldType: 'Input',
          type: 'textarea',
          labelSuffix: '：',
          rows: 2
        }
      },
      rules: {
        name: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }, {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }],
        region: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }],
        type: [{
          type: 'array',
          required: true,
          message: '请至少选择一个活动性质',
          trigger: 'change'
        }],
        resource: [{
          required: true,
          message: '请选择活动资源',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: '请填写活动形式',
          trigger: 'blur'
        }]
      },
      formInline: {
        user: '',
        region: ''
      },
      configInline: {
        user: {
          prop: 'user',
          fieldType: 'Input',
          label: '审批人',
          placeholder: '审批人'
        },
        region: {
          prop: 'region',
          label: '活动区域',
          fieldType: 'Select',
          options: [{
            label: '区域一',
            value: 'shanghai'
          }, {
            label: '区域二',
            value: 'beijing'
          }]
        }
      },
      labelPosition: 'left',
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      config2: {
        pass: {
          prop: 'pass',
          label: '密码',
          fieldType: 'Input',
          autocomplete: 'off',
          type: 'password'
        },
        checkPass: {
          prop: 'checkPass',
          label: '确认密码',
          fieldType: 'Input',
          type: 'password'
        },
        age: {
          prop: 'age',
          label: '年龄',
          fieldType: 'Input'
        }
      },
      rules2: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
        age: [{
          validator: checkAge,
          trigger: 'blur'
        }]
      },
      dynamicValidateConfig: {
        email: {
          prop: 'email',
          label: '邮箱',
          fieldType: 'Input'
        },
        domains: {
          prop: 'domains',
          label: '域名',
          fieldType: 'Customer',
          filter: {
            render: function render(h) {
              return h(DomainInput, {
                "attrs": {
                  "value": _this.dynamicValidateForm.domains
                },
                "on": {
                  "del": _this.removeDomain
                }
              });
            }
          }
        }
      }
    };
  },
  methods: {
    removeDomain: function removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);

      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain: function addDomain() {
      this.dynamicValidateForm.domains.push({
        url: '',
        key: Date.now()
      }); // const i = this.dynamicValidateForm.domains.length
      // this.dynamicValidateConfig[`domains${i}`] = {
      //   prop: `domains${i}`,
      //   label: `域名${i}`,
      //   fieldType: 'Customer',
      //   filter: {
      //     render: (h) => {
      //       return <DomainInput value={this.dynamicValidateForm.domains}></DomainInput>
      //     }
      //   }
      // }
    },
    handleCreate: function handleCreate() {
      var _this2 = this;

      console.log(this.$refs.form);
      this.$refs.form.validate(function (valid) {
        console.log(valid);

        if (valid) {
          console.log('立即创建', _this2.form);
        }
      });
    },
    handleCancel: function handleCancel() {
      this.form = this.createForm();
      console.log('取消', this.form);
    },
    submitForm: function submitForm(formName) {
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createForm: function createForm() {
      return {
        name: '',
        region: '',
        date: '',
        time: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      };
    }
  }
});
// CONCATENATED MODULE: ./examples/views/form/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_formvue_type_script_lang_js_ = (formvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./examples/views/form/index.vue





/* normalize component */

var form_component = Object(componentNormalizer["a" /* default */])(
  views_formvue_type_script_lang_js_,
  formvue_type_template_id_7063ca24_scoped_true_render,
  staticRenderFns,
  false,
  null,
  "7063ca24",
  null
  
)

/* harmony default export */ var views_form = __webpack_exports__["default"] = (form_component.exports);

/***/ }),

/***/ "9b42":
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "c135":
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "c240":
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;

/***/ })

}]);
//# sourceMappingURL=yui.common.2.js.map