import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'
// import '@/assets/ant.less'

// import { Modal, message} from 'ant-design-vue';
// import 'ant-design-vue/es/message/style/css'
// import 'ant-design-vue/es/modal/style/css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
