import axios from 'axios'
import { message } from 'ant-design-vue'

// 取消请求
// const source = axios.CancelToken.source();

// const AUTH_TOKEN = ''
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL, // mock的时候需要关闭
  headers: {
    // common: {
    //   Authorization: AUTH_TOKEN
    // },
    post: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 3 * 60 * 1000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.code === 401) {
        message.info('登录过期，请重新登录')
        setTimeout(() => {
          window.location.href = '/login'
        }, 16)
        return Promise.reject(response)
      }
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export const setToken = (AUTH_TOKEN) => {
  axios.defaults.headers.common['Token'] = AUTH_TOKEN
  instance.defaults.headers.common['Token'] = AUTH_TOKEN
}

export default instance
