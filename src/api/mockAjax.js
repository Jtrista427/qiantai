// 二次封装
import axios from 'axios'
import nProgress from 'nprogress' //start开始，done进度条结束
// 引入样式
import "nprogress/nprogress.css"
// 利用axios对象的方法create创建实例
const requests = axios.create({
    // 基础路径，发送请求时路径中出现api
    baseURL: '/mock',
    // 设置超时时间
    timeout: 2000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config：配置对象，里面的headers属性很重要
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