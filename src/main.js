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
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
