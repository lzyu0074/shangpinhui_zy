import Vuex from 'vuex'
import Vue from 'vue'

import home from './home'
import search from './search'
import detail from './detail'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home,
    search,
    detail
  }
})

export default store