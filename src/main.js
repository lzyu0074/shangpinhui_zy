import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from '@/store'

// 执行mockjs
import '@/mock'

// swiper
import 'swiper/css/swiper.css'
// 轮播图全局组件
import Carousel from '@/components/Carousel'

// 全局组件： 
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)


Vue.config.productionTip = false

// 全局事件总线（eventBus）

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
