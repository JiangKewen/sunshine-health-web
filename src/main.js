import './assets/main.scss'
import '@/assets/ant.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setToken } from './service/axios'

const oldToken = window.localStorage.getItem('TOKEN')
if (oldToken) {
  setToken(oldToken)
}
const app = createApp(App)

// app.use(Antd)
app.use(createPinia())
app.use(router)

// 在资源加载完成后进行挂载
window.addEventListener('DOMContentLoaded', () => {
  app.mount('#app')
})
