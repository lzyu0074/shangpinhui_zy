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