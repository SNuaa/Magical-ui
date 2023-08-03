<template>
  <m-table :options="options" size="small"></m-table>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({
  options: {
    fileds: [
      { field: "attr", title: "参数", align: "center" },
      { field: "type", title: "类型", align: "center" },
      { field: "red", title: "说明", align: "center", width: "350px" },
      { field: "sel", title: "可选值", align: "center" },
      { field: "def", title: "默认值", align: "center" },
    ],
    datas: [
      {
        attr: "pageNo",
        type: "Object",
        red: "当前显示的页数",
        sel: "——",
        def: "{ num: 1 }",
      },
      {
        attr: "pageSize ",
        type: "Object",
        red: "每一页展示的数据量",
        sel: "——",
        def: "{ value: 8 }",
      },
      {
        attr: "total",
        type: "Number",
        red: "设置数据总数",
        sel: "——",
        def: "300",
      },
      {
        attr: "continues",
        type: "Number",
        red: "分页器的连续页码数",
        sel: "——",
        def: "5",
      },
    ],
  },
});
const { options } = state;
</script>

<style lang="scss" scoped></style>