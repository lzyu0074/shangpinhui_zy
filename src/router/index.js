import Vue from 'vue'
import VueRouter from 'vue-router'

import MyHome from '@/pages/my-home'
import MyLogin from '@/pages/my-login'
import MyRegister from '@/pages/my-register'
import MySearch from '@/pages/my-search'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: MyHome },
    { path: '/login', component: MyLogin },
    { path: '/register', component: MyRegister },
    { path: '/search', component: MySearch },
  ]
})

export default router