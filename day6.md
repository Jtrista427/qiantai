分页器
多个地方用到，成为全局组件
ElementUI有分页器组件

分页器需要知道
当前页数pageNo
一页展示多少条数据pageSize
一共有多少条数据total
分页器中连续页面的个数 continues 5|7（奇数：对称）

先使用假数据自己写好再连接服务器

1.分页器需要算出连续页面的起始数字和结束数字
使用start和end计算
v-for可以遍历数组、数字，字符串，对象
2.添加点击事件，点击一下就把数据传到Search中修改数据，重新发起请求
在使用分页器组件的时候，需要自定义事件，来获取组件中点击修改的页数
$emit.getPageNo(pageNo - 1)错误
$emit('getPageNo',pageNo - 1)
3.点击谁谁亮


开发详情页面
1.点击商品时跳转到详情页面是需要传参的，所以在配置路由的时候就要带参数

跳转到详情页时滚动条不自动在最上面
当创建Router实例的时候，可以提供一个scrollbehavior方法

2.写api,请求接口
3.vuex，在里面写函数调用接口

dispatch传递多个参数
let result = await this.$store.dispatch("detail/getShopCar", {
        skuNum: this.skuNum,
        skuId: this.$route.params.skuId,
      });


本地存储和会话存储，是html5新增的
本地存储：持久的 5M大小
会话存储：并未持久，网页关闭就没有了
一般存储的是字符串，不能存储为对象,使用JSON.stringify()

this.$router.push({}) 里面采用{}，那么path这些名字就不能省

购物车
像服务器发起ajax请求，获取购物车数据
发请求时获取不到购物车数据，因为服务器不知道你是谁（个人购物车）

UUID临时游客身份
从大仓库获取数据
store.state.detail.uuid_token
动态展示购物车
{{中也可以写简单的运算，比如计算总价}}

修改购物车产品数量
需要重新发起请求，带参数
节流函数的运用
函数名：throttle(async function(){},time) 注意async的写法

删除某个产品（新接口）

修改产品是否选择状态（接口）

删除选中商品
没有一次删除很多产品的接口，只有通过id删除的接口（一次一个）
没有在点击事件中一次次发起请求，而是在仓库中新增一个action函数删除
Promise.all([p1,p2,p3]),只有p1p2p3都成功，该promise才成功


小仓库action中的content代表的是小仓库，不是整个仓库
