<!-- html -->
<template>
  <m-radio v-model="radioVal" :options="radioOptions" @change="radioChange"></m-radio>
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
const radioChange = (e) => {
  console.log(e.value, e.index);
};
const { radioOptions } = state;
</script>