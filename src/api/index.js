// API统一管理
import requests from "./request";
// 三级联动文档


export const reqCategoryList = () => {
    // debugger
    // 发请求,注意axios返回对象是promise
    return requests.get('/product/getBaseCategoryList')
}

import mockRequests from './mockAjax'
export const reqGetBannerList = () => mockRequests.get('/banner')
export const reqGetFloorList = () => mockRequests.get('/floor')
// mock的search接口
// export const reqSearchInfo = (params) => {
//     // console.log(params);
//     return mockRequests({ url: '/list', method: "post", data: params })
// }

// 添加购物车的函数，接口又好了嘿
// export const reqAddorUpdateShopCar = (skuId, skuNum) => {
//     // console.log(params);
//     return mockRequests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })
// }

// 需要带参数的请求
// 当前这个接口，传递的参数params至少是个空对象，要有默认值
export const reqSearchInfo = (params) => {
    return requests({ url: '/list', method: "post", data: params })
}

// 获取产品详情页的接口
export const reqGoodsInfo = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: "get" })
}

// 将产品添加到购物车中（获取更新某个产品的个数）
// 接口失效，或使用mock
export const reqAddorUpdateShopCar = (skuId, skuNum) => { return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" }) }

// 获取购物车数据
export const reqShopCartInfo = () => {
    return requests({ url: "/cart/cartList", method: "get" })
}

// 删除购物车某个产品
export const deleteShopCartInfo = (skuId) => {
    return requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
}

// 修改购物车某个产品状态
export const reqUpdateCheckedInfo = (skuId, isChecked) => {
    return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })
}

// 获取验证码
export const reqGetCode = (phone) => {
    return requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })
}

// 注册接口
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: "post" })

// 登陆接口
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: "post" })

// 获取用户登录后的用户信息【需要带用户的token，接口中没有，那就写在header中】
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: 'get' })

// 获取用户的订单信息
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: 'get' })


// 接下来不使用vuex,为了方便使用，可以在main.js中直接导出所有的函数
// 提交订单 tradNo是路径中需要的参数，data包括其他要上传到服务器的参数
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取订单支付信息
export const reqPayment = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付状态信息
export const reqQueryPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取我的订单列表
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })

