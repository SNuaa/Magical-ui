<template>
  <div class="header-block-box">
    <div class="logoBox">
      <img src="../../src/assets/images/logo.png" alt="mzl-ui" @click="toHome" />
      <a href="javascript:;" @click="toHome">Magical UI</a>
    </div>
    <div class="toolsBox">
      <a href="javascript:;" v-for="(item, index) in tools" :key="index" :class="{ active: tabIndex == index }"
        @click="pageView(item, index)">{{ item.name }}</a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, onMounted } from "vue";
const { push, currentRoute } = useRouter();
const toHome = () => push("/");
const fullPath = ref(currentRoute.value.fullPath)
const tabIndex = ref(
  fullPath == "/magicalui"
    ? 1
    : sessionStorage.getItem("tabIndex") || 0
);

const state = reactive({
  tools: [
    {
      name: "组件库概述",
      path: "/",
    },
    {
      name: "组件文档",
      path: "/magicalui/demo",
    },
  ],
});
const { tools } = state;
const pageView = (item, index) => {
  tabIndex.value = index;
  sessionStorage.setItem("tabIndex", index);
  if (item.path == "open") {
    window.open(item.url);
  } else {
    if (item.path != fullPath) {
      push(item.path);
    }
  }
};
onMounted(() => {
  if (fullPath == "/magicalui") {
    sessionStorage.setItem("tabIndex", 1);
  }
});
</script>

<style scoped lang="scss">
.header-block-box {
  width: 100%;
  height: 64px;
  padding: 0 300px;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logoBox {
    display: flex;
    align-items: center;

    img {
      width: 42px;
      height: 42px;
      margin-right: 15px;
      cursor: pointer;
    }

    a {
      padding-right: 10px;
      color: #4a5264;
      font-weight: 700;
      font-size: 18px;
      // font-family: PuHuiTi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      //   Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji,
      //   segoe ui emoji, Segoe UI Symbol, noto color emoji, sans-serif;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
    }
  }

  .toolsBox {
    a {
      font-weight: normal;
      font-size: 16px;
      padding: 8px 3px;
      margin-left: 25px;
      border-bottom: 2px solid #fff;
      display: inline-block;
      float: none;
      line-height: normal;
      transition: all 0.2s ease;
      text-decoration: none;
      color: #4a5264;

      &:hover {
        color: #0e80eb;
        border-color: #0e80eb;
        // color: #2d5af1;
        // border-color: #2d5af1;
      }
    }

    a.active {
      color: #0e80eb;
      border-color: #0e80eb;
    }
  }
}
</style>
