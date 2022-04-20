import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

Vue.use(VueRouter)

// 为解决多次导航（多次点击搜索框报 NavigationDuplicated错误）报错问题
// 重写push和replace方法：为他们传入回调，防止报错
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, meta: { footerShow: true }, name: 'home' },
    { path: '/login', component: Login, meta: { footerShow: false }, name: 'login' },
    { path: '/register', component: Register, meta: { footerShow: false }, name: 'register' },
    { path: '/search/:searchword?', component: Search, meta: { footerShow: true }, name: 'search' },
  ]
})

export default router