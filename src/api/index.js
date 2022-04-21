// 这个模块对API接口进行统一管理
import requests from './request'

export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
