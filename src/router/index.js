import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入store，获取token，判断是否已经登陆
import store from "@/store/index"

// 保留原始的push
let originPush = VueRouter.prototype.push
//重写push|replace
VueRouter.prototype.push = function (loaction, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
        //call|apply区别
        // 相同:都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同：call传参用逗号隔开，apply传递数组
    } else {
        originPush.call(this, loaction, () => { }, () => { })
    }
}

import routes from './routes'

let router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }

})

// 已经登陆就不能去login页面
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.userToken
    let name = store.state.user.userInfo.name
    if (token) {
        // 已经登陆了还想去登录页，不能去，只能留在home页
        if (to.path == '/login') {
            next('/home')
        }
        else {
            // 登陆了，去其他的页面，要保证用户信息存在，否则页面一刷新信息就没有了
            if (name) {
                next()
            } else {
                // 没有用户信息就发起请求
                try {
                    await store.dispatch("user/getUserInfo");
                    next()
                } catch (error) {
                    // token失效了，也就是发起请求失败
                    // 清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    }
    else {
        // 没有登陆
        let topath = to.path
        // 不能去交易与支付相关的页面
        if (topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1 || topath.indexOf('/center') != -1) {
            // 把未登录的时候想去而没有去成的信息，存储于地址栏中
            next('/Login?redirect=' + topath)
        }
        else
            next()
    }
})

export default router