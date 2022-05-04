import Vue from 'vue'
import VueRouter from 'vue-router'


import store from '@/store'

// 路由数组
import routes from './routes'

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
  routes
  ,
  // 跳转路由后滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})

// 为解决2个问题：1、登录后还能通过设置浏览器地址栏跳到登录页面。2、登录后 一刷新就没有了用户信息
// 设置导航守卫
// 再解决未登录导航问题
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
    const toPath = to.path
    // 如果没登录，要去trade、pay、center则先登录,此时login路由带着本来想去的地方的path，在登录组件中判断路由中有没有带东西，带了的话就登录跳到那个path
    if (toPath.includes('/trade') || toPath.includes('/pay') || toPath.includes('/center') || toPath.includes('/shopcart')) {
      next({ name: 'login', query: { redirect: toPath } })
    } else {
      next()
    }

  }
})

export default router