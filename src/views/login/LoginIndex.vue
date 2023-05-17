<template>
  <div class="login-wrap"></div>
  <section class="login-form-wrap">
    <h2 class="login-title">后台管理系统</h2>
    <el-form class="login-form" :model="loginForm">
      <el-form-item>
        <el-input v-model="loginForm.name" placeholder="用户名">
          <template #prepend>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" placeholder="登录密码">
          <template #prepend>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSumbit">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const loginForm = reactive({
  name: '',
  password: ''
})

const router = useRouter()
function onSumbit() {
  window.localStorage.setItem('TOKEN', 'XXXXXX')
  router.push('/')
}
</script>

<style scoped lang="scss">
.login-wrap {
  height: 100vh;
  background: url('/bg.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(5px);
}
.login-form-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 3px;
  background: rgba(100, 100, 100, 0.3);
  overflow: hidden;
  backdrop-filter: blur(8px);
  .login-title {
    line-height: 50px;
    text-align: center;
    font-size: 28px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .login-form {
    padding: 30px 50px;
  }
}
</style>
