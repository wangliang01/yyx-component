## 审核表单

审核的通用表单

### 基本用法

::: demo

```html
<template>
    <div class="audit-form">
        <y-audit-form v-model="form" :config="config" label-width="120px" label-suffix="："></y-audit-form>
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
                form: {},
                config: {
                    auditResult: {
                        label: '审核结果',
                        prop: 'auditResult',
                        fieldType: 'Radio',
                        options: [
                            {
                                label: '通过',
                                value: '1',
                                cols: 12
                            },
                            {
                                label: '未通过',
                                value: '0',
                                cols: 12
                            }
                        ]
                    },
                    auditComponent: {
                        label: '审核结果',
                        prop: 'auditComponent',
                        fieldType: 'Input',
                        type: 'textarea'
                    }
                }
            }
        },
        mounted() {

        },
        methods: {

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
| value / v-model     | 绑定值                                                                | object  | ——     | ——  |

### Events

| 事件名称 | 说明                   | 回调参数                               |
| -------- | ---------------------- | -------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过。 |
