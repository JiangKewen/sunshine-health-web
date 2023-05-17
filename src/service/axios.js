import axios from 'axios'

// 取消请求
// const source = axios.CancelToken.source();

// const AUTH_TOKEN = ''
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
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
    if (response.status == 200) {
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

export default instance
