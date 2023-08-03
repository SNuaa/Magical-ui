<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="pageNo.num == 1" @click="emit('getPageNo', pageNo.num - 1);">上一页</button>
    <button v-show="startAndEndNumber.start > 1" @click="emit('getPageNo', 1)"
      :class="{ active: pageNo.num === 1 }">1</button>
    <button v-show="startAndEndNumber.start > 2" disabled>···</button>

    <button v-for="(item, index) in middleNumber" :key="index" @click="emit('getPageNo', item)"
      :class="{ active: pageNo.num === item }">{{ item
      }}</button>

    <button v-show="startAndEndNumber.end < totalPage - 1" disabled>···</button>
    <button v-show="startAndEndNumber.end < totalPage" @click="emit('getPageNo', totalPage)"
      :class="{ active: pageNo.num === totalPage }">{{ totalPage }}</button>

    <!-- 下一页 -->
    <button :disabled="pageNo.num == totalPage" @click="emit('getPageNo', pageNo.num + 1)">下一页</button>
    <!-- 总共的数据 -->
    <button style="margin-left: 10px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "mPagination"
}
</script>

<script  setup>
//父组件传递过来的pageNo发生改变 子组件的startAndEndNumber不会立即更新
import { computed } from 'vue';
const { pageNo, pageSize, total, continues } = defineProps({
  pageNo: {
    type: Object,
    default: { num: 1 }
  },
  pageSize: {
    type: Object,
    default: { value: 8 }
  },
  total: {
    type: Number,
    default: 300
  },
  continues: {
    type: Number,
    default: 5
  },
})

const totalPage = computed(() => Math.ceil(total / pageSize.value));
const emit = defineEmits(['getPageNo', 'getPageNum']);
const startAndEndNumber = computed(() => {
  let start = 0, end = 0;
  if (totalPage.value < continues) {
    start = 1;
    end = totalPage.value;
  } else {
    start = pageNo.num - Math.floor(continues / 2);
    end = pageNo.num + Math.floor(continues / 2);
    if (start < 1) {
      start = 1;
      end = continues;
    }
    if (end > totalPage.value) {
      start = totalPage.value - continues + 1;
      end = totalPage.value;
    }
  }
  let numObj = { "start": start, "end": end };
  return numObj;
})
const middleNumber = computed(() => {
  return Array.from({ length: startAndEndNumber.value.end - startAndEndNumber.value.start + 1 }, (_, index) => startAndEndNumber.value.start + index);
});
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background: #0094ca;
}
</style>