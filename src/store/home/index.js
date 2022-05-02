import { reqCategoryList, reqBanner, reqFloors, delayReqFloors } from '@/api/index'

const home = {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: [],
    floorsList: []
  },
  mutations: {
    INITCATEGORYLIST(state, res) {
      state.categoryList = res
    },
    SETBANNER(state, res) {
      state.bannerList = res
    },
    GETFLOORS(state, res) {
      state.floorsList = res
    }
  },
  actions: {
    // 发请求 获取三级菜单数据
    async initCategoryList(context) {
      let { data: res } = await reqCategoryList()

      res.length > 16 ? res.pop() : res
      context.commit('INITCATEGORYLIST', res)
    },
    async getBanner(context) {
      const res = await reqBanner()
      if (res.code === 200) {
        context.commit('SETBANNER', res.data)
      }
    },
    async getFloors(context) {
      const res = await reqFloors()
      if (res.code === 200) {
        context.commit('GETFLOORS', res.data)
      }
      // const res = await delayReqFloors()
      // if (res.code === 200) {
      //   context.commit('GETFLOORS', res.data)
      // }
    }
  },
  getters: {

  }
}
export default home