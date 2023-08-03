<!-- html -->
<template>
  <m-space>
    <m-select v-model="selVal" placeholder="默认大小" :options="selOptions"></m-select>
    <m-select v-model="selVal" placeholder="小一点的" :options="selOptions" size="small"></m-select>
    <m-select v-model="selVal" placeholder="mini型的" :options="selOptions" size="mini"></m-select>
  </m-space>
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