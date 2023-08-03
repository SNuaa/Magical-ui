<!-- html -->
<template>
  <mChunkList :Data="Data" />
</template>
<!-- js-->
<script setup>
import { reactive } from 'vue'
const Data = reactive([])
for (let i = 0; i < 1000; i++) {
  Data.push(i);
}
console.log(Data);
</script>