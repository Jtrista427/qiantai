node_modules文件夹：项目依赖文件夹
public文件夹：放置一些静态资源（图片），webpack打包的时候会原封不动打包到dist文件夹中
src文件夹（程序员源代码文件夹）：
    assets：放置静态资源（多个组件共用的静态资源），打包的时候会当做一个模块，打包在Js文件里面
    componets：防止非路由组件（全局组件）
babel.config.js:配置文件（babel相关）


路由组件
Home，Search，Login，Register
非路由组件：
Header 首页搜索页
Footer（首页搜索页有，注册登陆页没有）

项目采用less样式，浏览器不识别less样式，需要通过less，less-loader（版本5）进行处理，把less变成css样式,然后在style标签上添加lang属性

$route：一般获取路由信息【路径，query，params等】
$router：一般进行编程式导航进行路由跳转，【push、replace】

路由的跳转
声明式导航router-link
编程式导航 push、replace，声明式可以做的，编程式都可以，还可以做其他的业务逻辑处理

Footer组件的显示与隐藏
显示或隐藏组件：v-if|v-show
可以根据组件身上的$route获取当前路由的路径来判断，组件过多就会很麻烦
方法：采用全局组件，使用meta（路由元信息），通过$route.meta.show判断


路由传参
params参数：属于路径当中的一部分，在配置路由的时候需要占位
query参数：不属于路径中的一部分，类似于ajax中的queryString /home?k=v&kv=1 不需要占位
三种写法：字符串、模板字符串、对象
面试题：
1.路由传递参数（对象写法）path是否可以结合params参数一起使用
不可以,必须使用name

2.如何指定params参数可传可不传
比如已经占位，但是跳转时没有传参，此时url会出现问题
在配置路由时，在占位的后面加上？表示可传可不传
path: '/search/:keyword？',

3.params参数可以传可以不传，如果传递的是空字符串，怎么解决
传递空串可能被认为没传
params：{keyword:keyword||undefined}
4.路由组件能不能传递props数据
可以，在配置路由的时候，布尔，对象，函数三种方法