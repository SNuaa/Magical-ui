<template>
  <div class="main">
    <div class="left">
      <div class="title">
        Magical UI
      </div>
      <div class="des">
        轻量级UI组件库
      </div>
      <div class="detail">
        完美支持vite+vue3版本，轻巧的体积，极速的响应，灵活的拓展
      </div>
      <div class="buttons">
        <button class="button1">
          🌲 组件库概述
        </button>
        <router-link to="/magicalui/demo">
          <button class="button2" >
            📃 组件文档
          </button>
        </router-link>
      </div>
      <div class="line"></div>
      <div class="bottom">
        <div class="box">
          <div class="logo">💡</div>
          <div class="title">Vue3组件库</div>
          <div class="content">基于vue3构建，可快速引入组件，持续开发中</div>
        </div>
        <div class="box">
          <div class="logo">🔨</div>
          <div class="title">按需引入</div>
          <div class="content">直接支持按需引入无需配置任何插件</div>
        </div>
        <!-- <div class="box">
          <div class="logo">📦</div>
          <div class="title">持续开发中</div>
          <div class="content">用于Vue3组件库的学习</div>
        </div> -->
        <div class="box">
          <div class="logo">🚀</div>
          <div class="title">组件丰富</div>
          <div class="content">持续提供高质量通用组件</div>
        </div>
        <div class="box">
          <div class="logo">📌</div>
          <div class="title">个性化</div>
          <div class="content">组件具有高可自定义度，可快速创建个性化组件</div>
        </div>
        <!-- <div class="box">
          <div class="logo">⚡</div>
          <div class="title">简洁至上</div>
          <div class="content">一个以简洁，简单，使用方便为主题的组件库</div>
        </div> -->
      </div>
    </div>
    <div class="right">
      <img src="../../src/assets/images/logo.png" alt="">
    </div>

  </div>
</template>
<style scoped lang="scss">
.main {
  max-width: 100%;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 0px 10px 0 400px;
  margin-top: 60px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  // background-color: #d1c0c0;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 30px;

}

.left .title {
  font-size: 100px;
  line-height: 100px;
  font-weight: bold;
  color: #2d5af1;
  margin-bottom: 18px;
}

.left .des {
  font-size: 70px;
  line-height: 70px;
  font-weight: bold;
  margin-bottom: 20px;
}

.left .detail {
  font-size: 25px;
  color: rgb(60, 60, 67, 0.75);
  margin-bottom: 40px;
}

.left .buttons {
  display: flex;
  justify-content: flex-start;
}

.left .buttons .button1 {
  padding: 18px 20px;
  width: 200px;
  outline: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 2px;
  background: #fff;
  transition: all 0.15s ease;
  user-select: none;
  overflow: hidden;
  line-height: 1;
  white-space: nowrap;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #2d5af1;
  color: #ffffff;
  margin-right: 20px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
    color: #333;
    border-color: #d9d9d9;
    background: #ffffff;
    transition: .1s;
  }
}

.left .buttons .button2 {
  padding: 18px 20px;
  width: 200px;
  outline: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 2px;
  background: #fff;
  transition: all 0.15s ease;
  user-select: none;
  overflow: hidden;
  line-height: 1;
  white-space: nowrap;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #333;
  margin-right: 20px;

  &:hover {
    color: #2d5af1;
    border-color: #2d5af1;
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
}

.line {
  width: 100%;
  border: 0.2px solid #e5e5e7;
  margin-top: 30px;
  margin-bottom: 30px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.bottom .box {
  padding: 20px;
  width: 270px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
  border: 1px solid #e5e5e7;
}

.bottom .box .logo {
  margin-bottom: 10px;
  font-size: 27px;
  background-color: transparent;
  transform: translate(-6px);
}

.bottom .box .title {
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.bottom .box .content {
  font-size: 16px;
  color: rgb(60, 60, 67, 0.75);
}

.right img {
  width: 800px;
}
</style>
