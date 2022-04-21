import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from '@/store'

// 全局组件：
import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name, TypeNav)

// 测试
import { reqCategoryList } from '@/api'
reqCategoryList()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
