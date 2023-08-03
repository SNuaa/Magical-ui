<!-- html -->
<template>
  <m-textarea v-model="textareaVal" placeholder="该本文域不可拉伸" :resize="resize"></m-textarea>
</template>

<!-- js -->
<script setup>
import { ref } from "vue";
const textareaVal = ref("");
const resize = ref(false);
</script>