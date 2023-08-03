<!-- html -->
<template>
  <m-select v-model="selVal" placeholder="请选择" :options="selOptions"></m-select>
</template>

<!-- js -->
<script setup>
import { reactive, ref } from "vue";
const selVal = ref("");
const state = reactive({
  selOptions: [
    { label: "柯基", value: "keji", disabled: true },
    { label: "博美", value: "bomei" },
    { label: "金毛", value: "jinmao" },
    { label: "萨摩耶", value: "samoye" },
    { label: "哈士奇", value: "hashiqi", disabled: true },
  ],
});
const { selOptions } = state;
</script>