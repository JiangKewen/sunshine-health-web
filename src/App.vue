<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import { ConfigProvider as AConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import router from './router'
dayjs.locale('zh-cn')

const token = window.localStorage.getItem('TOKEN') || ''
if (!token) {
  router.push('/login')
}
</script>
