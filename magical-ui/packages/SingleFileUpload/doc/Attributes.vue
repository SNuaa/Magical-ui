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
      {attr:'type',type:'String',red:'单文件上传类型',sel:'FormData / FormBase64 / FormBase64Img',def:"FormData"},
      {attr:'size',type:'String',red:'文件上传大小',sel:'-MB',def:"2MB"},
      {attr:'format',type:'Array',red:'文件上传格式',sel: 'png/jpg/jpeg',def:"['png', 'jpg', 'jpeg']"},
      {attr:'path',type:'String',red:'文件上传路径',sel:'——',def:"null"},
    ]
  }
})
const {options} = state
</script>

<style lang="scss" scoped>

</style>