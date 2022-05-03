import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import store from '@/store'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

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
    { path: '/search/:keyword?', component: Search, meta: { footerShow: true }, name: 'search' },
    { path: '/detail/:skuid', component: Detail, meta: { footerShow: true }, name: 'detail' },
    { path: '/addCartsuccess', component: AddCartSuccess, meta: { footerShow: true }, name: 'AddCartSuccess' },
    { path: '/shopcart', component: ShopCart, meta: { footerShow: true }, name: 'ShopCart' },
    { path: '/trade', component: Trade, meta: { footerShow: true }, name: 'Trade' },
    { path: '/pay', component: Pay, meta: { footerShow: true }, name: 'pay' },
    { path: '/paysuccess', component: PaySuccess, meta: { footerShow: true }, name: 'paysuccess' },
    {
      path: '/center', component: Center, meta: { footerShow: true }, name: 'center',
      redirect: '/center/myorder',
      children: [
        { path: 'myorder', component: MyOrder, name: 'myorder' },
        { path: 'grouporder', component: GroupOrder, name: 'grouporder' },
      ],

    },

  ],
  // 跳转路由后滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

// 为解决2个问题：1、登录后还能通过设置浏览器地址栏跳到登录页面。2、登录后 一刷新就没有了用户信息
// 设置导航守卫
router.beforeEach(async (to, from, next) => {
  // 若仓库中的token存在(仓库中的token拉取自本地存储)，就是已登录状态
  if (store.state.user.userToken) {
    // 若已登录，又想去login页面，不放行，让它去home页面
    if (to.name === 'login') {
      next({ name: 'home' })
    } else {
      // // 若已登录，想去login以外的路由，等待派发action获取用户信息，然后放行
      try {
        await store.dispatch('user/getUserInfo')
        next()
      } catch (error) {
        // 如果获取用户信息失败(token过期)，派发aciton清除仓库里的token和用户名（相当于退出登录），重新登录
        await store.dispatch('user/userLogout')
        // alert(error.message + '或token过期')
        console.log('未登录或token过期');
        next({ name: 'login' })

      }
    }
    // 若token不存在，就是没登录
  } else {
    next()
  }
  // next()
})

export default router