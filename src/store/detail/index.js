import { reqDetailInfo, reqAddtoCart } from '@/api/index'
import { getTouristId } from '@/utils/getTouristId'

const detail = {
  namespaced: true,
  state: {
    detailInfo: {},
    uuid_token_tourist: getTouristId()
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
    // 7. 添加到购物车(对已有物品进行数量改动)
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