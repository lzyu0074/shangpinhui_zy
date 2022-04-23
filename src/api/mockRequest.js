// 对axios进行二次封装
import axios from 'axios'

// 网页顶部进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/mock',
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
  // 这里返回了reponse.data,其他模块发请求接收的数据直接就是服务器的数据，不再是axios再包一层的数据
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default requests