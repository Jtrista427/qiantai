1） 开发Search模块的TypeNav模块
首先typeNav在search组件中默认不显示，在home中显示
使用v-show,同时通过路由路径判断是否默认显示

同时，在search组件中，鼠标移上去就要显示，离开就要消失，但是在home组件中离开不消失
都采用鼠标移动事件

2） 分类菜单过渡动画效果
使用transition标签，只能包含一个元素
对应元素一定要有v-if或者v-show指令（这样动画才有效果嘛）

3）
如果将服务器请求放在组件中，那么跳转一次路由就会像服务器发起请求，于是将请求放在APP（最先执行的）中，只调用一次，仓库中就有了,mian.js还没有this

4）合并params和query参数
去search组件有两种方式，一种是搜索，一种是点击菜单，这两种方式都分别会传参
如果不合并，后面的操作会只传query参数或者params参数，导致其中的一个消失

5）开发home首页，Listcontainer和floor~
不是服务器返回的图片，自己创建mock
mockjs插件：生成随机数据，拦截Ajax请求（不会让请求发送到服务器上，即不会和服务器有通信）（印记中文网站获得）

mock使用步骤
1.在src创建mock文件夹
2.准备json数据（mock文件夹中创建相应的json文件） 一定要格式化一下，不要留有空格
3.把mock需要的图片放置到public文件夹中，这样打包的时候，会把资源原封不动打包到dist文件夹中
4.开始mock，创建mockServe.js通过mockjs实现模拟数据
5.在入口文件中引入mockServer.js文件，至少需要执行一次(因为没有对外暴露，所以引入就会自动执行)

JSON数据格式没有对外暴露，但是可以引入
webpack默认对外暴露：图片，JSON数据格式


6）ListContainer组件开发重点
swiper插件创建轮播图（移动端和pc端都能用）
1.引包
2.页面的html要有
3.初始化swiper实例（必须在结构完整后），使其具有动态效果
初试化放在mounted当中不行
虽然mounted时，结构已经有了，但是结构中有动态生成的v-for，需要拿到服务器的数据后才能生成（异步），放在mouted中，初始化实例会发生在修改仓库中bannerlist数据之前
放在updated中，每次其他数据更新也会初始化实例，没必要
可以在mounted中对初始化添加定时器，使其成为异步语句
最完美的：通过watch，监听已有数据变化，监听bannerList的变化(但不能保证v-for完成)
+nextTick
watch: {
    // 监听bannerList数据的变化
    bannerList: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          // 执行这个回调的时候，保证服务器数据回来了，v-for执行完毕了
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球也切换页面
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  

7)开发floor组件
查看floor.json文件，发现数组里面有两个对象，分别是两个floor的数据，因此，不能在floor组件中发起请求
因为在home组件中使用两次floor组件，因为应该在home组件中触发getFloorList
v-for在自定义组件标签上也可以使用
此时swiper组件初试化可以在floor 的mounted中操作
因为发送请求在父组件中，而且数据也给了floor，因此在floor挂载后，结构是完整的
mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        // 点击小球也切换页面
        clickable: true,
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // });
    });
  },




组件间通信的方式？
props：用于父子间组件通信
自定义事件：@on和@emit可以实现子给父通信
全局事件总监：$bus 全能
pubsub-js:vue中几乎不用，全能
插槽：
vuex

兄弟：全局