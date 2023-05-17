<template>
  <el-config-provider :locale="zhCn" size="large">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
