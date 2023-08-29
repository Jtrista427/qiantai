<template>
  <!-- 三级联动 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托鼠标离开 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委托实现路由跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 从后台获取数据再渲染,先获取一级菜单 -->
              <div class="item" v-for="(c1, index) in CategoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex == index }">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <!-- 二级菜单 -->
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category1Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category1Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                          <!-- <router-link to="/search">{{ -->
                          <!-- c3.categoryName -->
                          <!-- }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入lodash实现节流，因为是默认导出，所以不用加{}
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    // 设置鼠标在一级分类的位置
    return { currentIndex: -1, show: true };
  },
  // 挂载完毕，可以向服务器发送请求
  mounted() {
    // 通知vuex发送请求，获取数据，存储于仓库当中，对应方法在home仓库中配置
    // this.$store.dispatch("home/categoryList"); 为了避免每次路由跳转都向服务器发起请求
    // 每次使用这个组件的时候都会调用这个函数，所以在这里控制show
    // 通过路由判断
    // console.log(this.$router);
    if (this.$router.currentRoute.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // 右侧如果是函数，当这个计算属性被使用的时候，函数会立即执行
    // 会注入一个参数state，就是大仓库中的数据
    ...mapState("home", ["CategoryList"]),
    // ...mapState({ CategoryList: (state) => state.home.CategoryList }),
  },
  methods: {
    // 鼠标修改响应式数据currentIndex
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },
    // 怎么应用节流函数要记住
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移除样式,显示事件也写在这里
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$router.currentRoute.path != "/home") {
        this.show = false;
      }
    },
    enterShow() {
      this.show = true;
    },
    goSearch(event) {
      let element = event.target;
      // 解构，获得几级菜单
      // console.log(event);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: "Search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // 通过样式控制二三级菜单的显示
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background: rgb(105, 179, 221);
        }
      }
    }

    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>