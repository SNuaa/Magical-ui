<!-- html -->
<template>
  <mPagination :pageNo="currentpageNo" :pageSize="PageNum" :total="total" :continues="continues" @getPageNo="getPageNo"
    @getPageNum="getPageNum" />
</template>

<!-- js -->
<script setup>
import { reactive } from 'vue';

// const currentpageNo = reactive({ num: 1 })
const PageNum = reactive({ value: 18 })
// const total = 300
// const continues = 5

const getPageNo = (PageNo) => {
  currentpageNo.num = PageNo
  console.log('当前第几页：' + currentpageNo.num);
}

const getPageNum = (pagenum) => {
  PageNum.value = parseInt(pagenum)
  console.log('每一页需要展示多少条数据：' + PageNum.value);
}

</script>