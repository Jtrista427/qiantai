1. 编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplication警告错误（重复路径会报错），
声明式导航就没有这类问题，vue——router已经处理好了
为什么？
因为push返回的是一个promise对象，而创建一个promise需要传入成功和失败的回调
vue设计这种情况走reject，但是没有定义reject？
通过给push方法传递响应的成功或者失败的回调函数，可以捕获到当前的错误，可以解决，但是不治本
因为push是vueRouter原型上的函数，因此需要重写原型上的push函数

如果尝试导航到一个已经存在于历史堆栈中的路由，就会触发这个警告，而vue router将路由记录在历史堆栈中，用于记录当前的路由状态

2.Home组件拆分
2.1三级联动组件，在home，search等组件都出现了，因此注册为全局组件

3.axios二次封装
为什么需要二次封装
请求拦截器，响应拦截器

axios经常在API文件夹中,axios有文档

4.接口统一管理
项目很小：可以在组件的生命周期函数中发出请求
项目大：就可以统一管理，一一获取接口太麻烦

5.跨域问题

6.nprogress进度条
start:进度条开始
done：进度条结束
进度条颜色在人家的样式文件中修改

7.vuex状态管理库
是一个插件，管理组件公用的数据，不是所有的项目都需要
重在模块式开发
namespced写在分模块中
这样调用方法的时候this.$store.dispatch("home/categoryList");
调用数据CategoryList: (state) => state.home.CategoryList或数组形式

但是如果将namespced写在总模块中,
方法可以通过this.$store.dispatch("categoryList");直接调用，但是
state中的数据只能通过函数形式或的了
