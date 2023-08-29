// 二次封装
import axios from 'axios'
import nProgress from 'nprogress' //start开始，done进度条结束
// 引入样式
import "nprogress/nprogress.css"

// 引入仓库store
import store from '@/store/index'

// 利用axios对象的方法create创建实例
const requests = axios.create({
    // 基础路径，发送请求时路径中出现api
    baseURL: '/api',
    // 设置超时时间
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config：配置对象，里面的headers属性很重要
    // console.log(store.state.detail.uuid_token);
    if (store.state.detail.uuid_token) {
        // 给请求头添加一个字段（userTempId），和后台商量好的，不能瞎写
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token给服务器
    if (store.state.user.userToken) {
        config.headers.token = store.state.user.userToken
    }
    // 进度条开始动
    nProgress.start()
    return config
}, function (error) {
    return Promise.reject(error)
})

requests.interceptors.response.use((res) => {
    nProgress.done()
    // console.log(res.data);
    return res.data
}, (error) => {
    // 相应失败的回调函数
    return Promise.reject(new Error('fail'))
})

export default requests