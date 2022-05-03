import Mock from 'mockjs'
import category from './category.json'
import banner from './banner.json'
import floors from './floors.json'

Mock.mock('/mock/category', category)
Mock.mock('/mock/banner', { code: 200, data: banner })

// 首页底部的floors
Mock.mock('/mock/floors', { code: 200, data: floors })

// 获取订单支付信息mock数据，由于/api/payment/weixin/createNative/{orderId} 503，所以这里用mock数据吧
Mock.mock(`/api/mock/payment/weixin/createNative`, {
  "code": 200,
  "message": "成功",
  "data": {
    "codeUrl": "https://api.uixsj.cn/hitokoto/get?type=zha",
    "orderId": 71,
    "totalFee": 23996,
    "resultCode": "SUCCESS"
  },
  "ok": true
}
)
// 查询订单支付状态
Mock.mock(`/api/mock/payment/weixin/queryPayStatus`, {
  // "code": 205,
  // "message": "支付中",
  "code": 200,
  "message": "支付完成",
  "data": null,
  "ok": false
}
)
