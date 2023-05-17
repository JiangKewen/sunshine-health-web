import './assets/main.scss'
import 'element-plus/theme-chalk/el-message.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '../mock/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
