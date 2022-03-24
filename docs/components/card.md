# Card 卡片

卡片信息主要用来展示详情信息。

## 基本用法

通过传入`data`和`columns`，即可渲染一个 Card。

::: demo

```html
<template>
  <y-card :data="data" :columns="columns" descriptions border></y-card>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          spuName: '胡萝卜AAA',
          shelfLife: '15',
          type: 'standard',
          brand: '集鲜到',
          backType: '生鲜蔬菜/根茎类/萝卜/胡萝卜',
          saleRate: '0.00',
          salePrice: '斤',
          address: '成都',
          storageTemperatureZone: '常温',
          purchaseTaxRate: '0.15',
          minSpec: '500ml/瓶',
          averageWeight: '大于200g',
          shape: '大小均匀、没有坑洼'
        },
        columns: [
          {
            label: 'SPU 名称',
            prop: 'spuName'
          },
          {
            label: '保质期',
            prop: 'shelfLife'
          },
          {
            label: '类型',
            prop: 'type',
            formattor(val) {
              if (val === 'standard') {
                return '标品'
              }
            }
          },
          {
            label: '品牌',
            prop: 'brand'
          },
          {
            label: '后类类目',
            prop: 'backType'
          },
          {
            label: '销售税率',
            prop: 'saleRate',
            formattor(val) {
              return `${val}%`
            }
          },
          {
            label: '最小销售单位',
            prop: 'salePrice'
          },
          {
            label: '产地',
            prop: 'address'
          },
          {
            label: '储藏温区',
            prop: 'storageTemperatureZone'
          },
          {
            label: '采购税率',
            prop: 'purchaseTaxRate',
            formattor(val) {
              return `${val}%`
            }
          },
          {
            label: '最小规格',
            prop: 'minSpec'
          },
          {
            label: '均重',
            prop: 'averageWeight'
          },
          {
            label: '形状',
            prop: 'shape'
          }
        ]
      }
    }
  }
</script>
<style></style>
```

:::

## 修改标题

::: demo

```html
<template>
  <y-card title="SKU 基本信息"></y-card>
</template>
<script>
  export default {}
</script>
<style></style>
```

:::

## Formattor 格式化数据

当接收的数据，跟想要展示的数据有出入时，我们可以通过`formattor`属性来调整。

```js {4-6}
 {
  label: '采购税率',
  prop: 'purchaseTaxRate',
  formattor(val) {
    return `${val}%`
  }
}
```

::: demo

```html
<template>
  <y-card :data="data" :columns="columns"></y-card>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          spuName: '胡萝卜AAA',
          shelfLife: '15',
          type: 'standard',
          brand: '集鲜到',
          backType: '生鲜蔬菜/根茎类/萝卜/胡萝卜',
          saleRate: '0.00',
          salePrice: '斤',
          address: '成都',
          storageTemperatureZone: '常温',
          purchaseTaxRate: '0.15',
          minSpec: '500ml/瓶',
          averageWeight: '大于200g',
          shape: '大小均匀、没有坑洼'
        },
        columns: [
          {
            label: 'SPU 名称',
            prop: 'spuName'
          },
          {
            label: '保质期',
            prop: 'shelfLife'
          },
          {
            label: '类型',
            prop: 'type',
            formattor(val) {
              if (val === 'standard') {
                return '标品'
              }
            }
          },
          {
            label: '品牌',
            prop: 'brand'
          },
          {
            label: '后类类目',
            prop: 'backType'
          },
          {
            label: '销售税率',
            prop: 'saleRate',
            formattor(val) {
              return `${val}%`
            }
          },
          {
            label: '最小销售单位',
            prop: 'salePrice'
          },
          {
            label: '产地',
            prop: 'address'
          },
          {
            label: '储藏温区',
            prop: 'storageTemperatureZone'
          },
          {
            label: '采购税率',
            prop: 'purchaseTaxRate',
            formattor(val) {
              return `${val}%`
            }
          },
          {
            label: '最小规格',
            prop: 'minSpec'
          },
          {
            label: '均重',
            prop: 'averageWeight'
          },
          {
            label: '形状',
            prop: 'shape'
          }
        ]
      }
    }
  }
</script>
<style></style>
```

:::

## cols 控制想要展示的列数

当我们的 Card 组件，想要显示的列数跟预期的不一致时，可能通过 cols 来控制。

```js {2}
<template>
  <y-card :data="data" :columns="columns" cols="3"></y-card>
</template>
```

::: demo

```html
<template>
  <y-card :data="data" :columns="columns" cols="3"></y-card>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          spuName: '胡萝卜AAA',
          shelfLife: '15',
          type: 'standard',
          brand: '集鲜到',
          backType: '生鲜蔬菜/根茎类/萝卜/胡萝卜',
          saleRate: '0.00',
          salePrice: '斤',
          address: '成都',
          storageTemperatureZone: '常温',
          purchaseTaxRate: '0.15',
          minSpec: '500ml/瓶',
          averageWeight: '大于200g',
          shape: '大小均匀、没有坑洼'
        },
        columns: [
          {
            label: 'SPU 名称',
            prop: 'spuName'
          },
          {
            label: '保质期',
            prop: 'shelfLife'
          },
          {
            label: '类型',
            prop: 'type',
            formattor(val) {
              if (val === 'standard') {
                return '标品'
              }
            }
          },
          {
            label: '品牌',
            prop: 'brand'
          },
          {
            label: '后类类目',
            prop: 'backType'
          },
          {
            label: '销售税率',
            prop: 'saleRate',
            formattor(val) {
              return `${val}%`
            }
          },
          {
            label: '最小销售单位',
            prop: 'salePrice'
          },
          {
            label: '产地',
            prop: 'address'
          },
          {
            label: '储藏温区',
            prop: 'storageTemperatureZone'
          },
          {
            label: '采购税率',
            prop: 'purchaseTaxRate',
            formattor(val) {
              return `${val}%`
            }
          },
          {
            label: '最小规格',
            prop: 'minSpec'
          },
          {
            label: '均重',
            prop: 'averageWeight'
          },
          {
            label: '形状',
            prop: 'shape'
          }
        ]
      }
    }
  }
</script>
<style></style>
```

:::

## Card Attributes

| 名称    | 说明         | 类型          | 可选值 | 默认值 |
| ------- | ------------ | ------------- | ------ | ------ |
| data    | 数据源       | object        | -      | -      |
| columns | 数据列       | array         | -      | -      |
| title   | 标题         | string        | -      | 标题   |
| cols    | 控制显示的列 | string/number | -      | 4      |

## Card Column Attribute

| 名称      | 说明                    | 类型          |
| --------- | ----------------------- | ------------- |
| label     | 数据列显示的 Label 名称 | string        |
| prop      | 数据列显示的属性        | string        |
| formattor | 数据列格式化方法        | Function(val) |
