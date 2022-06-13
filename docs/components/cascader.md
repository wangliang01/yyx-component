## Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法

::: demo

```html
<template>
  <el-card>
    <el-row>
      <el-col :span="12">
        <div class="demonstration">默认 click 触发子菜单</div>
        <y-cascader :dataApi="dataApi"></y-cascader>
      </el-col>
      <el-col :span="12">
        <div class="demonstration">hover 触发子菜单</div>
        <y-cascader
          :props="{ expandTrigger: 'hover' }"
          :dataApi="dataApi"
        ></y-cascader>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    },
                    {
                      value: 'daohang',
                      label: '导航',
                      children: [
                        {
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        },
                        {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                    {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [
                        {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }
                      ]
                    },
                    {
                      value: 'others',
                      label: 'Others',
                      children: [
                        {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        },
                        {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [
                    {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    },
                    {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style>
  .demonstration {
    line-height: 50px;
  }
</style>
```

:::

### 禁用选项

通过在数据源中设置 disabled 字段来声明该选项是禁用的

::: demo

```html
<template>
  <el-card>
    <y-cascader :dataApi="dataApi"></y-cascader>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      disabled: true,
                      children: [
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    },
                    {
                      value: 'daohang',
                      label: '导航',
                      children: [
                        {
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        },
                        {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                    {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [
                        {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }
                      ]
                    },
                    {
                      value: 'others',
                      label: 'Others',
                      children: [
                        {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        },
                        {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [
                    {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    },
                    {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style></style>
```

:::

### 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。
属性 show-all-levels 定义了是否显示完整的路径，将其赋值为 false 则仅显示最后一级

::: demo

```html
<template>
  <el-card>
    <y-cascader :dataApi="dataApi" :show-all-levels="false"></y-cascader>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      disabled: true,
                      children: [
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    },
                    {
                      value: 'daohang',
                      label: '导航',
                      children: [
                        {
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        },
                        {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                    {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [
                        {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }
                      ]
                    },
                    {
                      value: 'others',
                      label: 'Others',
                      children: [
                        {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        },
                        {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [
                    {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    },
                    {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style></style>
```

:::

### 多选

可通过 props.multiple = true 来开启多选模式 ; collapse-tags 折叠展示 Tag

::: demo

```html
<template>
  <el-card>
    <el-row>
      <el-col :span="12">
        <div class="demonstration">默认显示所有Tag</div>
        <y-cascader :props="{ multiple: true }" :dataApi="dataApi"></y-cascader>
      </el-col>
      <el-col :span="12">
        <div class="demonstration">折叠展示Tag</div>
        <y-cascader
          collapse-tags
          :props="{ multiple: true }"
          :dataApi="dataApi"
        ></y-cascader>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    },
                    {
                      value: 'daohang',
                      label: '导航',
                      children: [
                        {
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        },
                        {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                    {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [
                        {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }
                      ]
                    },
                    {
                      value: 'others',
                      label: 'Others',
                      children: [
                        {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        },
                        {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [
                    {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    },
                    {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style>
  .demonstration {
    line-height: 50px;
  }
</style>
```

:::

### 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。启用该功能后，可让父子节点取消关联，选择任意一级选项。

::: demo

```html
<template>
  <el-card>
    <el-row>
      <el-col :span="12">
        <div class="demonstration">单选选择任意一级选项</div>
        <y-cascader
          :props="{ checkStrictly : true }"
          :dataApi="dataApi"
        ></y-cascader>
      </el-col>
      <el-col :span="12">
        <div class="demonstration">多选选择任意一级选项</div>
        <y-cascader
          :props="{ multiple: true , checkStrictly: true }"
          :dataApi="dataApi"
        ></y-cascader>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    },
                    {
                      value: 'daohang',
                      label: '导航',
                      children: [
                        {
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        },
                        {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                    {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [
                        {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }
                      ]
                    },
                    {
                      value: 'others',
                      label: 'Others',
                      children: [
                        {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        },
                        {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [
                    {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    },
                    {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style>
  .demonstration {
    line-height: 50px;
  }
</style>
```

:::

### 动态加载

当选中某一级时，动态加载该级下的选项。

::: demo

```html
<template>
  <el-card>
    <y-cascader :props="props" :dataApi="dataApi"></y-cascader>
  </el-card>
</template>
<script>
  let id = 0
  export default {
    data() {
      return {
        props: {
          lazy: true,
          lazyLoad(node, resolve) {
            const { level } = node
            // 第一次不执行
            if (id > 0) {
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map((item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2
                }))
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes)
              }, 1000)
            } else {
              id++
            }
          }
        },
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南'
                },
                {
                  value: 'ziyuan',
                  label: '资源'
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style></style>
```

:::

### 可搜索

可以快捷地搜索选项并选择。将 filterable 赋值为 true 即可打开搜索功能，默认会匹配节点的 label 或所有父节点的 label(由 show-all-levels 决定)中包含输入值的选项。你也可以用 filter-method 自定义搜索逻辑，接受一个函数，第一个参数是节点 node，第二个参数是搜索关键词 keyword，通过返回布尔值表示是否命中。

::: demo

```html
<template>
  <el-card>
    <el-row>
      <el-col :span="12">
        <div class="demonstration">单选可搜索</div>
        <y-cascader
          @change="handleChange"
          v-model="value"
          filterable
          :dataApi="dataApi"
        ></y-cascader>
      </el-col>
      <el-col :span="12">
        <div class="demonstration">多选可搜索</div>
        <y-cascader
          filterable
          :props="{ multiple: true }"
          :dataApi="dataApi"
        ></y-cascader>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    },
                    {
                      value: 'daohang',
                      label: '导航',
                      children: [
                        {
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        },
                        {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [
                    {
                      value: 'navigation',
                      label: 'Navigation',
                      children: [
                        {
                          value: 'steps',
                          label: 'Steps 步骤条'
                        }
                      ]
                    },
                    {
                      value: 'others',
                      label: 'Others',
                      children: [
                        {
                          value: 'carousel',
                          label: 'Carousel 走马灯'
                        },
                        {
                          value: 'collapse',
                          label: 'Collapse 折叠面板'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'ziyuan',
                  label: '资源',
                  children: [
                    {
                      value: 'sketch',
                      label: 'Sketch Templates'
                    },
                    {
                      value: 'jiaohu',
                      label: '组件交互文档'
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    },
    methods: {
      handleChange() {
        console.log('value', this.value)
      }
    }
  }
</script>
<style>
  .demonstration {
    line-height: 50px;
  }
</style>
```

:::

### 地址选择器

用于选择地址，type 参数：可选在省（province）或者市（city）； mode 参数： 国内（internal）， 国外（overseas）

::: demo

```html
<template>
  <el-card>
    <y-address-cascader
      v-model="currentValue"
      mode="internal"
    ></y-address-cascader>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        currentValue: '',
        dataApi() {
          return new Promise((resolve, reject) => {
            resolve({
              code: '200',
              data: [
                {
                  adcode: '410000',
                  id: '1',
                  level: 1,
                  name: '河南省',
                  pid: '0',
                  districts: [
                    {
                      id: '2',
                      citycode: '0379',
                      adcode: '410300',
                      name: '洛阳市',
                      level: 2,
                      pid: '1',
                      districts: [
                        {
                          id: '3',
                          citycode: '0379',
                          adcode: '410324',
                          name: '栾川县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '4',
                          citycode: '0379',
                          adcode: '410323',
                          name: '新安县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '5',
                          citycode: '0379',
                          adcode: '410328',
                          name: '洛宁县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '6',
                          citycode: '0379',
                          adcode: '410381',
                          name: '偃师区',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '7',
                          citycode: '0379',
                          adcode: '410304',
                          name: '瀍河回族区',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '8',
                          citycode: '0379',
                          adcode: '410302',
                          name: '老城区',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '9',
                          citycode: '0379',
                          adcode: '410311',
                          name: '洛龙区',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '10',
                          citycode: '0379',
                          adcode: '410327',
                          name: '宜阳县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '11',
                          citycode: '0379',
                          adcode: '410325',
                          name: '嵩县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '12',
                          citycode: '0379',
                          adcode: '410305',
                          name: '涧西区',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '13',
                          citycode: '0379',
                          adcode: '410303',
                          name: '西工区',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '14',
                          citycode: '0379',
                          adcode: '410329',
                          name: '伊川县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '15',
                          citycode: '0379',
                          adcode: '410326',
                          name: '汝阳县',
                          level: 3,
                          pid: '2'
                        },
                        {
                          id: '16',
                          citycode: '0379',
                          adcode: '410306',
                          name: '孟津区',
                          level: 3,
                          pid: '2'
                        }
                      ]
                    }
                  ]
                }
              ],
              success: true
            })
          })
        }
      }
    }
  }
</script>
<style></style>
```

:::

### Cascader Attributes

| 参数            | 说明                                                                                              | 类型                    | 可选值                | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------------- | ----------------------- | --------------------- | ------ |
| value / v-model | 选中项绑定值                                                                                      | ——                      | ——                    | ——     |
| dataApi         | 请求数据的方法                                                                                    | function                | ——                    | ——     |
| props           | 配置选项，具体见下表                                                                              | object                  | ——                    | ——     |
| size            | 尺寸                                                                                              | string                  | medium / small / mini | ——     |
| placeholder     | 输入框占位文本                                                                                    | string                  | ——                    | 请选择 |
| disabled        | 是否禁用                                                                                          | boolean                 | ——                    | false  |
| clearable       | 是否支持清空选项                                                                                  | boolean                 | ——                    | false  |
| filterable      | 是否可搜索选项                                                                                    | boolean                 | ——                    | false  |
| filter-method   | 自定义搜索逻辑，第一个参数是节点 node，第二个参数是搜索关键词 keyword，通过返回布尔值表示是否命中 | function(node, keyword) | ——                    | ——     |
| debounce        | 搜索关键词输入的去抖延迟，毫秒                                                                    | number                  | ——                    | 300    |
| before-filter   | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选             | function(value)         | ——                    | ——     |
| popper-class    | 自定义浮层类名                                                                                    | string                  | ——                    | ——     |

### Cascader Events

| 事件名称       | 说明                          | 回调参数                      |
| -------------- | ----------------------------- | ----------------------------- |
| change         | 当选中节点变化时触发          | 选中节点的值                  |
| expand-change  | 当展开节点发生变化时触发      | 各父级选项值组成的数组        |
| blur           | 当失去焦点时触发              | (event: Event)                |
| focus          | 当获得焦点时触发              | (event: Event)                |
| visible-change | 下拉框出现/隐藏时触发         | 出现则为 true，隐藏则为 false |
| remove-tag     | 在多选模式下，移除 Tag 时触发 | 移除的 Tag 对应的节点的值     |

### Cascader Methods

| 方法名          | 说明           | 参数                                        |
| --------------- | -------------- | ------------------------------------------- |
| getCheckedNodes | 获取选中的节点 | (leafOnly) 是否只是叶子节点，默认值为 false |

### Props

| 参数          | 说明                                                                                               | 类型                                                                                   | 可选值        | 默认值     |
| ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------- | --------- | 
| expandTrigger | 次级菜单的展开方式次级菜单的展开方式                                                               | string                                                                                 | click / hover | 'click'    |
| multiple      | 是否多选                                                                                           | boolean                                                                                | ——            | false      |
| checkStrictly | 是否严格的遵守父子节点不互相关联                                                                   | boolean                                                                                | ——            | false      |
| emitPath      | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | ——                                                                                     | boolean       | ——         | true |
| lazy          | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                     | boolean                                                                                | ——            | false      |
| lazyLoad      | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                       | function(node, resolve)，node 为当前点击的节点，resolve 为数据加载完成的回调(必须调用) | ——            | ——         |
| value         | 指定选项的值为选项对象的某个属性值                                                                 | string                                                                                 | ——            | 'value'    |
| label         | 指定选项标签为选项对象的某个属性值                                                                 | string                                                                                 | ——            | 'label'    |
| children      | 指定选项的子选项为选项对象的某个属性值                                                             | string                                                                                 | ——            | 'children' |
| disabled      | 指定选项的禁用为选项对象的某个属性值                                                               | string                                                                                 | ——            | 'disabled  |
| leaf          | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                   | string                                                                                 | ——            | 'leaf'     |

### address-cascader

| 参数  | 说明                                       | 类型     | 可选值            | 默认值 |
| ----- | ------------------------------------------ | -------- | ----------------- | ------ |
| value | 必填地址的值                               | ——       | ——                | ——     |
| mode  | 国内： internal; 国外: overseas            | string   | internal/overseas | ——     |
| api   | 请求数据的方法                             | function | ——                | ——     |
| type  | province（显示省市区）, city（显示市和区） | string   | ——                | ——     |
