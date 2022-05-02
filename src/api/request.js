// 对axios进行二次封装
import axios from 'axios'
// 导入store获取游客uuid
import store from '@/store'

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
  // 配置中带上游客的uuid（临时令牌）
  if (store.state.detail.uuid_token_tourist) {
    config.headers.userTempId = store.state.detail.uuid_token_tourist
  }
  // 配置中带上用户token（若有) （登录后的真正的令牌）（后台优先度以此为准）这个token是从仓库里取的
  if (store.state.user.userToken) {
    config.headers.token = store.state.user.userToken
  }
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