<template>
  <div class="login-wrap"></div>
  <section class="login-form-wrap">
    <h2 class="login-title">后台管理系统</h2>
    <el-form ref="formRef" class="login-form" :model="loginForm" :rules="rules">
      <el-form-item>
        <el-input v-model="loginForm.name" placeholder="用户名" prop="name">
          <template #prepend>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="登录密码"
          prop="password"
        >
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
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { postLogin } from '@/service/api'

const loginForm = reactive({
  name: '',
  password: ''
})
const rules = reactive({
  name: [{ required: true, message: '请输入用户', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }]
})
const formRef = ref(null)

const router = useRouter()
function onSumbit() {
  formRef.value.validate((valid) => {
    console.log('valid', valid)
    if (valid) {
      postLogin({
        data: loginForm
      }).then((res) => {
        console.log('res', res)
      })
      window.localStorage.setItem('TOKEN', 'XXXXXX')
      router.push('/')
    }
  })
}
console.log(router)
</script>

<style scoped lang="scss">
.login-wrap {
  height: 100vh;
  background: url('/bg2.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
}
.login-form-wrap {
  position: absolute;
  right: 10%;
  top: 56%;
  transform: translate(0%, -50%);
  width: 410px;
  border-radius: 5px;
  background: rgba(180, 180, 180, 0.3);
  overflow: hidden;
  backdrop-filter: blur(10px);
  .login-title {
    line-height: 50px;
    text-align: center;
    font-size: 28px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    margin: 40px 0 auto;
  }
  .login-form {
    padding: 30px 60px 50px 60px;
  }
}
</style>
