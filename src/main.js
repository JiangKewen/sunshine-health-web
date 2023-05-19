import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import antdv from './components/antd.js'

const app = createApp(App)

// app.use(Antd)
app.use(createPinia())
app.use(router)
app.use(antdv)

// 在资源加载完成后进行挂载
window.addEventListener('DOMContentLoaded', () => {
  app.mount('#app')
})
