let Mock = require('mockjs')
const mock = Mock.mock({
    "userInfo|9":[
        {
            "title|1":[
                '登录/注册',
                '消息',
                '购物车',
                '我的订单',
                '个人中心',
                '卖家中心',
                '客服',
                '手机版',
                '送至北京',
            ]
        }
    ]
})

module.exports = mock