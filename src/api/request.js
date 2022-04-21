// 对axios进行二次封装
import axios from 'axios'

// 网页顶部进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  // do something
  // 进度条：
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((response) => {
  // do something
  // 进度条结束：
  nprogress.done()
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default requests