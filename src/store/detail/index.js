import { reqDetailInfo, reqAddtoCart } from '@/api/index'

const detail = {
  namespaced: true,
  state: {
    detailInfo: {}
  },
  mutations: {
    GETDETAILINFO(state, data) {
      state.detailInfo = data
    }
  },
  actions: {
    // 获取商品信息
    async getDetailInfo(context, skuId) {
      const res = await reqDetailInfo(skuId)
      if (res.code === 200) {
        context.commit('GETDETAILINFO', res.data)
      }
    },
    // 加入购物车
    async addCart(context, params) {
      const res = await reqAddtoCart(params)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject('fail')
      }
    }
  },
  getters: {
    // 左上角导航信息
    categoryView(state) {
      return state.detailInfo.categoryView || {}
    },
    // 商品信息
    skuInfo(state) {
      return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.detailInfo.spuSaleAttrList || []
    }
  }
}
export default detail