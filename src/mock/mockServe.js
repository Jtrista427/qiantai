// 引入Mock，是个对象要大写
import Mock from 'mockjs'
// 引入JSON数据
import banner from './banner.json'
import floor from './floor.json'
import { data } from './searchList'
import { addToCart } from './addToCart'


// 第一个参数请求地址，第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }) //需要code来做判断
Mock.mock("/mock/floor", { code: 200, data: floor })
// Mock.mock("/mock/list", "post", require("./searchList"));
Mock.mock("/mock/list", "post", (options) => {
    return data(options)
});
Mock.mock(/\/mock\/cart\/addToCart/, "post", (options) => {
    // console.log(options) 包括整个完整的url，type，以及body
    return addToCart(options)
});