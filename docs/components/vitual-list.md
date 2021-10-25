## VirtualList 虚拟表格

使用于前端展示所有数据

::: demo
```html
<template>
  <y-virtual-list :data="tableData" :columns="columns">
  </y-virtual-list>
</template>
<script>
  const tableData = []
  for (let i = 0; i < 1000; i++) {
    const item = {
      index: i + 1,
      name: `小张${index + 1}`,
      age: index * Math.random() * 10
    }
    tableData.push(item)
  }
  export default {
    data() {
     return {
        // tableData: tableData,
        // columns: [
        //   {
        //     prop: 'index',
        //     label: '编号'
        //   },
        //   {
        //     prop: 'name',
        //     label: '姓名'
        //   },
        //   {
        //     prop: 'age',
        //     label: '年龄'
        //   }
        // ]
     }
    }
  }
</script>
```
:::