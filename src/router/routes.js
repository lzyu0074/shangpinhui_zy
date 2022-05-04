// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// ↑ 全注掉了，换成路由懒加载（异步组件），在进入这个路由的时候才加载对应的组件

export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/pages/Home'), meta: { footerShow: true }, name: 'home' },
  { path: '/login', component: Login, meta: { footerShow: false }, name: 'login' },
  { path: '/register', component: Register, meta: { footerShow: false }, name: 'register' },
  { path: '/search/:keyword?', component: Search, meta: { footerShow: true }, name: 'search' },
  { path: '/detail/:skuid', component: Detail, meta: { footerShow: true }, name: 'detail' },
  {
    path: '/addCartsuccess', component: AddCartSuccess, meta: { footerShow: true }, name: 'AddCartSuccess', beforeEnter: (to, from, next) => {
      // 路由独享守卫 如果不是从detail过来的，不让来
      if (!from.path.includes('/detail')) {
        next(false)
      } else {
        next()
      }
    }
  },
  { path: '/shopcart', component: ShopCart, meta: { footerShow: true }, name: 'ShopCart' },
  {
    path: '/trade', component: Trade, meta: { footerShow: true }, name: 'trade', beforeEnter: (to, from, next) => {
      // 路由独享守卫
      if (!from.path.includes('/shopcart')) {
        next(false)
      } else {
        next()
      }
    }
  },
  { path: '/pay', component: Pay, meta: { footerShow: true }, name: 'pay' },
  { path: '/paysuccess', component: PaySuccess, meta: { footerShow: true }, name: 'paysuccess' },
  {
    path: '/center', component: Center, meta: { footerShow: true }, name: 'center',
    redirect: '/center/myorder',
    children: [
      { path: 'myorder', component: MyOrder, name: 'myorder' },
      { path: 'grouporder', component: GroupOrder, name: 'grouporder' },
    ]
  },

]