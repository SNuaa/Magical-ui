<!-- html -->
<template>
  <m-textarea
    v-model="textareaVal"
    placeholder="请输入内容"
    focusColor="green"
  ></m-textarea>
</template>

<!-- js -->
<script setup>
import { ref } from "vue";
const textareaVal = ref("");
</script>