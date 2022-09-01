
::: demo

```html
<template>
    <div>
       <y-step :active="active">
         <y-step-item
           title="确认采购需求"
           subTitle="查询并选择"
         >
         </y-step-item>

         <y-step-item
           title="确认采购单"
           subTitle="按到仓仓库/到仓日期/供应商维度, 生成采购单"
         >

         </y-step-item>

         <y-step-item
           title="完成"
           subTitle="全部完成"
         >
           <div slot="bottom">
             追加采购单拆单维度：
           </div>
         </y-step-item>
       </y-step>
      <el-button @click="changeActive">下一个</el-button>
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
              active:0
            }
        },
        mounted() {

        },
        methods:{
            changeActive(){
              if(this.active >= 2){
                this.active = 0
              }else {
                this.active ++
              }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
```
