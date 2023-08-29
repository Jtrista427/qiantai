// 该文件是整个项目的入口文件
// 引入Vue 就不用script引入了
import Vue from 'vue'
// APP是所有组件的父组件
import App from './App.vue'
// 关闭vue生产提示
Vue.config.productionTip = false
// 注册为全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
Vue.component('TypeNav', TypeNav)
import Carousel from '@/components/Carousel/Carousel.vue'
Vue.component('Carousel', Carousel)

import Pagination from '@/components/Pagination/Pagination.vue'
Vue.component('Pagination', Pagination)

// 引入仓库
import store from './store/index'

// 测试
// import { reqCategoryList } from './api'
// reqCategoryList()

// 引入MockServer.js
import '@/mock/mockServe'

//引入swiper，在这里引listcontainer和floor都可以用
import "swiper/css/swiper.css"

// 引入路由
import router from '@/router'

// 统一引入接口api里面的全部请求函数
import * as API from "@/api"

// elementui
// import { MessageBox } from 'element-ui'
import ElementUI from 'element-ui'
// elementui注册组件的时候，还有一种写法，挂载原型上
Vue.use(ElementUI)
Vue.prototype.$msgbox = ElementUI.MessageBox;
Vue.prototype.$alert = ElementUI.MessageBox.alert;

import "element-ui/lib/theme-chalk/index.css";
// 懒加载插件
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1.3, //预加载的宽高比
  // 图片加载状态下显示的图片
  loading: '@/assets/icons.png',
  attempt: 1
})
// 接下来就可以使用v—lazy替换:src,注意要加个key，否则可能不能动态更新


new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    // 所有组件都可以直接使用了
    Vue.prototype.$API = API
  },
  //注册路由信息，注册后，所有组件身上都拥有$route,$router
  router,
  // 组件实例上出现$store属性
  store,
}).$mount('#app')
