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