import './assets/main.scss'
import '@/assets/ant.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(Antd)
app.use(createPinia())
app.use(router)

// 在资源加载完成后进行挂载
window.addEventListener('DOMContentLoaded', () => {
  app.mount('#app')
})
