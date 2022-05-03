import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from '@/store'

// 执行mockjs
import '@/mock'

// swiper
import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
// import 'swiper/css'
// import 'swiper/less'
// 轮播图全局组件
import Carousel from '@/components/Carousel'

// 全部导入api里面的接口函数
import * as API from '@/api'

// elementUI 按需引入
import { Button, MessageBox } from 'element-ui';

// 全局组件： 
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// elementUI
Vue.component(Button.name, Button);


Vue.config.productionTip = false

// 全局事件总线（eventBus）

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    // 把导入的接口函数的大对象挂在Vue原型对象上
    Vue.prototype.$API = API
    // element ui
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
}).$mount('#app')
