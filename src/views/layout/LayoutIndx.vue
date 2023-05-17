<template>
  <RouterView />
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function appToken() {
  const token = window.localStorage.getItem('TOKEN') || ''
  if (!token) {
    router.push('/login')
  }
}
appToken()
</script>
