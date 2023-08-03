<!-- html -->
<template>
  <m-space>
    <m-input v-model="value1" leftIcon="m-icon-map"></m-input>
    <m-input v-model="value2" rightIcon="m-icon-filter"></m-input>
  </m-space>
</template>

<!-- js -->
<script setup>
  import { ref } from "vue";
  const value1 = ref('')
  const value2 = ref('')
</script>