import { reqCategoryList, reqBanner } from '@/api/index'

const home = {
  namespaced: true,
  state: {
    categoryList: [],
    bannerList: []
  },
  mutations: {
    INITCATEGORYLIST(state, res) {
      state.categoryList = res
    },
    SETBANNER(state, res) {
      state.bannerList = res
    }
  },
  actions: {
    // 发请求 获取三级菜单数据
    async initCategoryList(state) {
      let { data: res } = await reqCategoryList()

      res.length > 16 ? res.pop() : res
      state.commit('INITCATEGORYLIST', res)
    },
    async getBanner(state) {
      const res = await reqBanner()
      if (res.code === 200) {
        state.commit('SETBANNER', res.data)
      }
    }
  },
  getters: {

  }
}
export default home