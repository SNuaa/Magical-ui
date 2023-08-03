<!-- html -->
<template>
  <m-input v-model="value1" type="text" placeholder="自定义focus颜色" focusColor="green"></m-input>
</template>

<!-- js -->
<script setup>
  import {ref} from 'vue'
  const value1 = ref('')
</script>