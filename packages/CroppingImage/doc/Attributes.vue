<template>
  <m-table :options="options"></m-table>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
  options:{
    fileds:[
      {
        field:'attr',
        title:'参数',
        align:'center'
      },
      {
        field:'type',
        title:'类型',
        align:'center'
      },
      {
        field:'red',
        title:'说明',
        align:'center',
        width:'350px'
      },
      {
        field:'sel',
        title:'可选值',
        align:'center'
      },
      {
        field:'def',
        title:'默认值',
        align:'center'
      }
    ],
    datas:[
      {attr:'num',type:'Number',red:'保存图片的数量',sel:'——',def:"5"},
    ]
  }
})
const {options} = state
</script>

<style lang="scss" scoped>

</style>