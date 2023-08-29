登陆与注册（必须会！）

assets文件夹放所有组件共用的静态资源
在CSS中也可以使用@
url(~@/...)

注册业务|登陆业务中的表单先不处理

获取验证码的接口把验证码返回了，但是正常情况下，后台把验证码发到用户手机上的

注册的时候通过数据库存储用户信息
登陆成功的时候，后台为了区分用户是谁，服务器会下发token【令牌：唯一标识】
一般登陆成功，服务器只会下发token，前台需要持久存储token，通过token发起请求

vuex仓库存储不是持久化的

登陆过后，首页展示用户信息
在home组件mounted中派发action获取用户信息，以及动态展示header组件内容

问题1：多个组件展示用户信息，那每个组件都需要mounted向服务端发送请求获取用户信息，否则刷新就没有了
问题2：用户已经登陆了，就不应该能够返回登陆页
（都通过路由守卫解决，在路由中也可以导入store）
请求用户信息要考虑到token失败，请求失败，这时要退出登录，重新返回登陆界面


17600000001
123456

13700000000
111111

生命周期函数中不能使用async

Element-UI

生成二维码QRcode
npm库中的
QRCode.toDataURL(this.payInfo.codeUrl)
返回的是一个promise


是否封装过组件？

全局守卫
没有登陆，交易相关，支付相关，用户中心都跳转到登陆页面

路由独享守卫trade和pay
next(false)

组件内守卫 paysuccess

图片懒加载
vue-lazyload
<img v-lazy="imgurl"> 替换src

自定义插件myPlugin.js
Vue插件一定暴露一个对象
let myplugin={}
myplugin.install=function(Vue,options){
<!-- 可以写一些全局性的东西 -->
vue.directive
vue.prototype.$bus
vue.component
}
export default myplugin

在main.js中注册
import myplugin from
Vue.ues(myplugin,{
    name:upper 此时组件的option中就会包含name
})


表单验证

路由懒加载
把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，就更加高效
一般都使用懒加载
{
        path: '/home',
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
            // 显示footer
            show: true
        }

    },


打包上线
项目打包后，代码都是经过压缩加密的，如果运行报错，无法得知是哪里的代码报错
有了map就可以像未加密代码一样，准确输出是哪一行有错
对于上线时无意义的。所以js中的map文件可删除
可以在vue.config.js中配置
productionSourceMap:false

购买服务器

nginx