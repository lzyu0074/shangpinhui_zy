import { reqOrderTrade, reqCommitOrder } from '@/api'

const state = {
  orderTradeInfo: {},
  orderId: ''
}
const mutations = {
  SETORDERTRADEINFO(state, data) {
    state.orderTradeInfo = data
  },
  SETORDERID(state, data) {
    state.orderId = data
  }
}
const actions = {
  // 获取订单交易信息
  async getOrderTradeInfo({ commit }) {
    const res = await reqOrderTrade()
    console.log('getOrderTradeInfo', res);
    console.log('tradeNo:' + res.data.tradeNo);
    if (res.code === 200) {
      commit('SETORDERTRADEINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('trade' + res.message))
    }
  },
  // 提交订单  --> 练习下在组件里发请求
  // async commitOrder({ commit }, { tradeNo, data }) {
  //   console.log('data:', data);
  //   const res = await reqCommitOrder(tradeNo, data)
  //   console.log('commitOrder', res);
  //   if (res.code === 200) {
  //     commit('SETORDERID', res.data)
  //     return 'ok'
  //   } else {
  //     return Promise.reject(new Error('提交订单失败' + res.message))
  //   }
  // }
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}