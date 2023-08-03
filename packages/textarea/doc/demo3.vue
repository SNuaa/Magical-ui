<!-- html -->
<template>
  <m-textarea
    v-model="textareaVal"
    placeholder="该本文域的最大长度为100"
    :maxlength="100"
  ></m-textarea>
</template>

<!-- js -->
<script setup>
import { ref } from "vue";
const textareaVal = ref("");
</script>