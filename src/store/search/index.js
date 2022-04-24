import { reqSearchInfo } from '@/api'
const search = {
  namespaced: true,
  state: {
    searchInfo: {}
  },
  mutations: {
    GETSEARCHINFO(state, res) {
      state.searchInfo = res
    }
  },
  actions: {
    // 这里是post请求，即使没有参数也一定要是空对象，否则什么都不传，服务器会返回请求失败
    async getSearchInfo(context, searchParams = {}) {
      const res = await reqSearchInfo(searchParams)
      if (res.code === 200) {
        context.commit('GETSEARCHINFO', res.data)
      }
    }
  },
  getters: {
    goodsList(state) {
      return state.searchInfo.goodsList || []
    },
    attrsList(state) {
      return state.searchInfo.attrsList || []
    },
    trademarkList(state) {
      return state.searchInfo.trademarkList || []
    },
  }
}
export default search