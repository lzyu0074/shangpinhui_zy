// 用户登录和注册

import { reqUserVerificationCode, reqRegister, reqLogin, reqGetUserInfo, reqUserLogout } from '@/api'

// 操作localstorage
import { setTokenInLocalStorage, getTokenFromLocalStorage, removeTokenInLocalStorage } from '@/utils/token'
const state = {
  verificationCode: '',
  userToken: getTokenFromLocalStorage(),
  username: ''
}
const mutations = {
  GETVERICODE(state, code) {
    state.verificationCode = code
  },
  SETUSERTOKEN(state, token) {
    state.userToken = token
  },
  GETUSERINFO(state, name) {
    state.username = name
  },
  REMOVEUSERNAMEANDTOKEN(state) {
    state.username = ''
    state.userToken = null
  }
}
const actions = {
  // 获取用户验证码
  async getVerificationCode({ commit }, phone) {
    const res = await reqUserVerificationCode(phone)
    if (res.code === 200) {
      commit('GETVERICODE', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取验证码失败'))
    }
  },
  // 注册
  async gotoRegister({ commit }, userData) {
    const res = await reqRegister({ phone: userData.userPhone, password: userData.userPassword, code: userData.userVerification })
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 登录
  async gotoLogin({ commit }, userData) {
    const res = await reqLogin(userData)
    if (res.code === 200) {
      commit('SETUSERTOKEN', res.data.token)
      // 把token设置在本地存储
      setTokenInLocalStorage(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },
  // 获取用户信息
  // 根据请求头的token（请求头拉取了仓库的token，仓库拿了本地存储的token）获取用户信息，并把用户信息设置在state里，供路由组件拉取仓库使用数据
  async getUserInfo({ commit }) {
    const res = await reqGetUserInfo()
    if (res.code === 200) {
      console.log('获取用户信息', res);
      commit('GETUSERINFO', res.data.loginName)
      return 'ok'
    } else {
      return Promise.reject(new Error(res.message))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    const res = await reqUserLogout()
    console.log('退出登录', res);
    if (res.code === 200) {
      // 清除localstorage的token
      // 清除state里的用户名和token
      removeTokenInLocalStorage()
      commit('REMOVEUSERNAMEANDTOKEN')
      return 'ok'
    } else {
      return Promise.reject(new Error('退出登录失败'))
    }
  }

}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}