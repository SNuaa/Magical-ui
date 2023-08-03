<!-- html -->
<template>
  <m-textarea
    v-model="textareaVal"
    placeholder="禁用状态"
    disabled
  ></m-textarea>
</template>

<!-- js -->
<script setup>
import { ref } from "vue";
const textareaVal = ref("");
</script>