1)轮播图在多个地方使用，拆分为公用的全局组件
因为在floor中我们把swiper组件写在mounted中，和ListContainer的轮播图写法不一样
为了拆分出轮播图组件，需要把大家的格式统一，因此floor也写在watch中
又因为watch监听不到list的变化，因为list从头到尾都没有变化
所以加上immediate属性，让从一开始就监听一次

开发项目时，多次使用的变成全局组件

2）Search模块开发
1：静态页面
2.发送请求（API）
3.vuex（三连环）
4.组件获取仓库数据，动态展示数据

3）因为search需要发起多次请求，所以不能写在mounted中
把请求封装成函数，需要的时候就调用
同时转到search页面的时候，也就是在发送请求至服务器之前，就需要把参数准备好，所以在beforemount中修改参数

Object.assign方法

4）监听路由变化再次发起请求
使用watch，监听数据变化，就重新发起请求

每一次请求完毕，需要把相应的1,2,3级分类id置空，让他接受下一次，否则第一次点击一级菜单，第二次点击的是另一个一级菜单下的二三级菜单，一级菜单的id不会改变 (不会完全覆盖,name会变化)

5)带给服务器的参数如果为空，也会向服务器提交数据
如果参数为undefined，那么当前字段不会带给服务器，这里要看文档，该参数是否是必须的


6)
1.动态开发面包屑中的分类名
编程式导航路由跳转
2.动态开发面包屑中的关键字
面包屑中的关键字清楚以后，需要让兄弟组件header中的额关键字清除
因此要设计组件通信，采用全局事件总监
3.点击品牌
子给父传参--自定义事件
自定义事件传多个参数不需要添加数组啥的
this.$emit("attrInfo", attr, attrValue);

7)小重点，价格排序操作
综合(1:asc/desc)和价格(2:asc/desc)