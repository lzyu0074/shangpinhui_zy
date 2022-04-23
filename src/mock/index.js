import Mock from 'mockjs'
import category from './category.json'
import banner from './banner.json'
import floors from './floors.json'

Mock.mock('/mock/category', category)
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floors', { code: 200, data: floors })