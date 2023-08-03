<!-- html -->
<template>
  <m-select
    v-model="selVal"
    placeholder="请选择"
    width="500px"
    height="60px"
    :options="selOptions"
  ></m-select>
</template>

<!-- js -->
<script setup>
import { reactive, ref } from "vue";
const selVal = ref("keji");
const state = reactive({
  selOptions: [
    { label: "柯基", value: "keji" },
    { label: "博美", value: "bomei" },
    { label: "金毛", value: "jinmao" },
    { label: "萨摩耶", value: "samoye" },
    { label: "哈士奇", value: "hashiqi" },
  ],
});
const { selOptions } = state;
</script>