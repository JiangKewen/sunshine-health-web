<template>
  <div class="app-login">
    <div class="login-wrap">
      <div class="login-left">
        <div class="login-logo">
          <img class="logo" src="@/assets/logo.png" alt="" />
          <h2 class="logo-h">健康管理系统</h2>
        </div>
        <div class="login-img">
          <img class="box-img" src="@/assets/login-box-bg.svg" alt="" />
          <h3 class="box-title">富阳阳光健康后台管理系统</h3>
          <span class="box-text">输入您的用户名密码开始使用！</span>
        </div>
      </div>
      <div class="login-right">
        <h3 class="form-title">登录</h3>
        <a-input size="large" class="form-input" v-model:value="name" placeholder="账号" />
        <a-input
          size="large"
          class="form-input"
          v-model:value="password"
          type="password"
          placeholder="密码"
        />
        <a-button size="large" class="form-btn" type="primary" @click="onLogin">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
const name = ref('')
const password = ref('')

function onLogin() {
  window.localStorage.setItem('TOKEN', 'xxx')
  router.push('/')
}
</script>

<style scoped lang="scss">
.app-login {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: '';
    background: url('@/assets/login-bg.svg');
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: -48%;
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
  .login-wrap {
    display: flex;
    height: 80vh;
    position: relative;
    margin: 0 auto;
    .login-left {
      height: 70vh;
      width: 40vw;
      color: white;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-between;
      user-select: none;
    }
    .login-logo {
      display: flex;
      align-items: center;
      animation: leftSide 0.5s linear forwards;
      .logo {
        width: 46px;
        margin-right: 12px;
      }
      .logo-h {
        margin: 0;
        font-size: 34px;
        color: white;
      }
    }
    .login-img {
      margin-bottom: 5vh;
      .box-img {
        width: 362px;
        opacity: 0;
        transform: translateX(-6vw);
        animation: leftSide 0.5s linear forwards;
        animation-delay: 0s;
      }
      .box-title {
        font-size: 30px;
        margin: 60px 0 16px 0;
        opacity: 0;
        transform: translateX(-6vw);
        animation: leftSide 0.5s linear forwards;
        animation-delay: 0.1s;
        color: white;
      }
      .box-text {
        display: inline-block;
        font-size: 14px;
        opacity: 0;
        transform: translateX(-6vw);
        animation: leftSide 0.5s linear forwards;
        animation-delay: 0.2s;
      }
    }
    .login-right {
      width: 36vw;
      height: 70vh;
      padding: 0 6vw 0 6vw;
      margin-top: -19vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: white;
      z-index: 10;
      .form-title {
        color: black;
        font-size: 35px;
        font-weight: 600;
        margin-bottom: 40px;
        opacity: 0;
        transform: translateX(6vw);
        animation: rightSide 0.5s linear forwards;
        animation-delay: 0s;
      }
      .form-input {
        margin-bottom: 30px;
        opacity: 0;
        transform: translateX(6vw);
        animation: rightSide 0.5s linear forwards;
        animation-delay: 0.12s;
      }
      .form-btn {
        width: 100%;
        opacity: 0;
        transform: translateX(6vw);
        animation: rightSide 0.5s linear forwards;
        animation-delay: 0.7s;
      }
    }
  }
}
@keyframes leftSide {
  0% {
    opacity: 0;
    transform: translateX(-6vw);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes rightSide {
  0% {
    opacity: 0;
    transform: translateX(6vw);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
