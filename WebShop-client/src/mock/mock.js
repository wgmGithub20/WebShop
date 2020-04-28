import Mock from 'mockjs'
// 导入模拟数据
import data from './data.json'
import gooodList from './goodsList.json'
 //设置Mock携带Cookie
Mock.XHR.prototype.withCredentials = true;
//编写模拟接口
const baseUrl  = 'http://localhost:3000'
// Mock.mock(baseUrl + '/getmock', {
//     code: 0,
//     id: "@id",
//     name: "@cname",
//     fenlei: '@city(true)',
//     image: "@image('200x100')",
//     "array|3": [
//         {
//            "src": "@image",
//         "id|+1":10
//        }
//     ],
//     "w": "@cword(10)",
//     "price":"@integer(500,2000)"
// })
Mock.mock(baseUrl + '/getgoodsList', {
    code: 0,
    message:gooodList.message
})
