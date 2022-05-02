// 这个模块对API接口进行统一管理
import requests from './request'
import mockRequest from './mockRequest'

// 真实接口 获取三级菜单数据
// export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
// 自己弄的模拟接口
// export const reqCategoryList = () => requests.get('/dataServer/category.json')
// mockjs接口
export const reqCategoryList = () => mockRequest.get('/category')

// 轮播图
export const reqBanner = () => mockRequest.get('/banner')

// 首页底部的floors
export const reqFloors = () => mockRequest.get('/floors')

// 延迟promise函数
const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
// 延迟2秒发送请求 mock数据
export const delayReqFloors = () => {
  return delay().then(() => {
    return mockRequest.get('/floors')
  })
}

// 获取search数据
export const reqSearchInfo = (searchParams) => requests({ url: '/list', method: 'post', data: searchParams })

// detail
export const reqDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// addCart
export const reqAddtoCart = (params) => requests.post(`/cart/addToCart/${params.skuID}/${params.skuNum}`)

// 获取购物车列表
export const reqGetCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车里某个商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartGoodsById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqGoodCheckedChange = ({ skuID, isChecked }) => requests.get(`/cart/checkCart/${skuID}/${isChecked}`)

// 获取用户验证码/api/user/passport/sendCode/{phone}
export const reqUserVerificationCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

// 注册 /api/user/passport/register
export const reqRegister = (userData) => requests.post('/user/passport/register', userData)

// 登录 /api/user/passport/login
export const reqLogin = (userData) => requests({ url: '/user/passport/login', method: 'post', data: userData })

// 根据token获取用户信息，token在请求拦截器的请求头里配置 /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录 /api/user/passport/logout
export const reqUserLogout = () => requests.get('/user/passport/logout')

// 订单交易页 （结算页）  /api/order/auth/trade
export const reqOrderTrade = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqCommitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取订单支付信息（订单提交成功页面） /api/payment/weixin/createNative/{orderId}
export const reqOrderPayInfo = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)
