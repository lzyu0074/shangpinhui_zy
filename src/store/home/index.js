import { reqCategoryList } from '@/api/index'

const home = {
  namespaced: true,
  state: {
    categoryList: []
  },
  mutations: {
    INITCATEGORYLIST(state, res) {
      state.categoryList = res
    }
  },
  actions: {
    async initCategoryList(state) {
      let { data: res } = await reqCategoryList()

      res.length > 16 ? res.pop() : res
      state.commit('INITCATEGORYLIST', res)
    }
  },
  getters: {

  }
}
export default home