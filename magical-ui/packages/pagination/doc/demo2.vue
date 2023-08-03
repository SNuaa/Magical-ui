<!-- html -->
<template>
  <mPagination :pageNo="currentpageNo" :pageSize="PageNum" :total="total" :continues="continues" @getPageNo="getPageNo" />
</template>

<!-- js -->
<script setup>
import { reactive } from 'vue';

const currentpageNo = reactive({ num: 5 })
// const PageNum = reactive({ value: 8 })
// const total = 200
// const continues = 5

const getPageNo = (PageNo) => {
  currentpageNo.num = PageNo
  console.log('当前第几页：' + currentpageNo.num);
}

</script>