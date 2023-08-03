<!-- html -->
<template>
  <m-space :inline="false">
    <m-radio v-model="radioVal" :options="radioOptions"></m-radio>
    <m-radio v-model="radioVal" :options="radioOptions" size="small"></m-radio>
    <m-radio v-model="radioVal" :options="radioOptions" size="mini"></m-radio>
  </m-space>
</template>

<!-- js -->
<script setup>
import { reactive, ref } from "vue";
const radioVal = ref("keji");
const state = reactive({
  radioOptions: [
    { label: "柯基", value: "keji" },
    { label: "博美", value: "bomei" },
    { label: "金毛", value: "jinmao" },
    { label: "萨摩耶", value: "samoye" },
    { label: "哈士奇", value: "hashiqi" },
  ],
});
const { radioOptions } = state;
</script>