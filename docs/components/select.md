## 下拉选择框

当选项过多时，使用下拉菜单展示并选择内容。

### 基本用法
适用广泛的基础单选,
v-model的值为当前被选中的el-option的 value 属性值
::: demo

```html
<template>
    <div>
        <y-select v-model="value" :options="options" :remote="false" unit="%"></y-select>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {
        },
        props: {

        },
        data() {
            return {
                value: '',
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
                }]
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>

</style>
```

:::

### 远程搜索
从服务器搜索数据，输入关键字进行查找
::: demo

```html
<template>
    <div>
        <y-select v-model="value" :api="getDataApi" :model="model" @change="handleChange"></y-select>
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
```

:::

### Attributes

| 参数          | 说明                                                                    | 类型     | 可选值 | 默认值 |
| ------------- | ----------------------------------------------------------------------- | -------- | ------ | ------ |
| config           | 表单配置项                                                      | object | ——     | ——     |
| value / v-model     | 绑定值                                                                | boolean / string / number  | ——     | ——  |
| model     | 数据模型                                                                | object  | ——     | {label: 'label', value: 'value', data: 'data'}  |
| api     | 服务端搜索                                                                | function  | ——     | ——  |
| format     | 格式化                                                                | function  | ——     | ——  |
| unit     | 单位                                                                | string  | ——     | ——  |

### Events

| 事件名称 | 说明                   | 回调参数                               |
| -------- | ---------------------- | -------------------------------------- |
| loaded | 获取列表事件 | Function(options: array) |
| change | 选中值发生变化时触发 | 	目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 	出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 	移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | 	—— |
| blur | 当 input 失去焦点时触发 | 	(event: Event) |
| focus | 当 input 获得焦点时触发 | 	(event: Event) |
