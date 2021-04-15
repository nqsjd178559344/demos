let Mock = require('mockjs');//引入mockjs模块
let Random = Mock.Random;

let data = [];
for (let i = 0; i < 10; i++) {
  let obj = {
    id: Random.id(),
    name: Random.ctitle(),
    "author|1-4": [
      Random.cname()
    ],
    introduction: Random.cparagraph(),
    "price|1-100.1-2": 1,
    // 'currency|1': [ // 币种
    //     'CNY', 'EUR', 'USD'
    // ],
    'max|1-5': 1,
    backgroundImage: Random.dataImage('80x140'),
    backgroundColor: Random.color(),
  }
  data.push(obj)
}

export default Mock.mock(data)