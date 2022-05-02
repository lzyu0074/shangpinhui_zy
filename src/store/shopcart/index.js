import { reqGetCartList, reqDeleteCartGoodsById, reqGoodCheckedChange } from '@/api'

export default {
  namespaced: true,
  state: {
    cartInfoList: []
  },
  mutations: {
    GETCARTLIST(state, data) {
      state.cartInfoList = data
    }
  },
  actions: {
    // 获取购物车数据
    async getCartList({ commit }) {
      const res = await reqGetCartList()
      console.log('获取购物车数据', res);
      if (res.code === 200) {
        commit('GETCARTLIST', res.data)
        return 'ok'
      } else {
        return Promise.reject('fail')
      }
    },
    // 删除商品by Id
    async deleteGoodsById({ commit }, skuId) {
      const res = await reqDeleteCartGoodsById(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    // 切换商品选中状态
    async goodsCheckChange({ commit }, { skuID, isChecked }) {
      const res = await reqGoodCheckedChange({ skuID, isChecked })
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('fail'))
      }
    },
    // 删除所有选中的商品
    deleteAllCheckedGoods({ dispatch, getters }) {
      let promiseArr = []
      getters.cartInfoList.cartInfoList.forEach(item => {
        item.isChecked && promiseArr.push(dispatch('deleteGoodsById', item.skuId))
      })
      return Promise.all(promiseArr)
    },
    // 全选和全不选
    allSelect({ state, dispatch }, allSelectState) {
      allSelectState = allSelectState ? '1' : '0'
      const promiseArr = []
      // 遍历购物车中的所有商品
      state.cartInfoList[0].cartInfoList.forEach(item => {
        // 若商品中的isChecked属性值 不等于全选按钮的属性值 就把更改该商品的选中状态，把它变成全选按钮的选中状态
        // 用promiseArrItem接收短路运算符&&的返回值（）
        const promiseArrItem = item.isChecked.toString() !== allSelectState && dispatch('goodsCheckChange', { skuID: item.skuId, isChecked: allSelectState })
        // 把以上返回的结果（若&&左边为假，就返回false,若左边为真就返回右边的结果，右边结果是一个promise）
        promiseArr.push(promiseArrItem)
      })
      // 此时promiseArr数组中的元素有false,有promise
      return Promise.all(promiseArr)
    }

  },
  getters: {
    cartInfoList(state) {
      // 这是可以的
      // return state.cartInfoList[0] ? state.cartInfoList[0].cartInfoList : []
      // 试试这样，在组件那边再computed一下
      return state.cartInfoList[0] || {}
    }
  }

}