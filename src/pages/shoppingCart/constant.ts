let Mock = require('mockjs');//引入mockjs模块
let Random = Mock.Random;

let dataItem = [];
for (let i = 0; i < 3; i++) {
  let objItem = {
    id: Random.id(),
    name: Random.ctitle(),
    "author": Random.cname(),
    introduction: Random.cparagraph(),
    "price|1-100.1-2": 1,
    'max|3-5': 1,
    backgroundImage: Random.dataImage('80x80'),
    backgroundColor: Random.color(),
  }
  dataItem.push(objItem)
}


let data = [];
for (let i = 0; i < 10; i++) {
  let obj = {
    shopId: Random.id(),
    shopName: Random.cname(),
    shopAddress: Random.county(true),
    shopOwner: Random.cname(),
    "shopOwnerIsOnline|1-2": true,
    list: Mock.mock(dataItem),
  }
  data.push(obj)
}

export default Mock.mock(data)