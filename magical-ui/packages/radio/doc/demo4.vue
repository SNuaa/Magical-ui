<!-- html -->
<template>
  <m-radio
    v-model="radioVal"
    :options="radioOptions"
    labelFiled="name"
    valueFiled="id"
  ></m-radio>
</template>

<!-- js -->
<script setup>
import { reactive, ref } from "vue";
const radioVal = ref(0);
const state = reactive({
  radioOptions: [
    { name: "蓝天", id: 0 },
    { name: "白云", id: 1 },
    { name: "草地", id: 2 },
    { name: "小溪", id: 3 },
  ],
});
const { radioOptions } = state;
</script>