// 路由配置信息
// const Home = () => {
//     return import("@/pages/Home/Home.vue") //返回的是一个promise
// }

export default [
    // 重定向
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import("@/pages/Home/Home.vue"),
        meta: {
            // 显示footer
            show: true
        }

    },
    {
        path: '/login',
        component: () => import("@/pages/Login/Login.vue"),
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: () => import("@/pages/Register/Register.vue"),
        meta: {
            show: false
        }
    },
    {
        name: 'Search',
        path: '/search/:keyword?',
        component: () => import("@/pages/Search/Search.vue"),
        meta: {
            show: true
        }
    },
    {
        path: '/detail/:skuId',
        component: () => import("@/pages/Detail/Detail.vue"),
        meta: {
            show: true
        }
    },
    {
        name: 'AddCartSuccess',
        path: '/addcartsuccess',
        component: () => import("@/pages/AddCartSuccess/AddCartSuccess.vue"),
        meta: {
            show: true
        }
    },
    {
        name: 'ShopCart',
        path: '/shopcart',
        component: () => import("@/pages/ShopCart/ShopCart.vue"),
        meta: {
            show: true
        }
    },
    {
        name: 'Trade',
        path: '/trade',
        component: () => import("@/pages/Trade/Trade.vue"),
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 必须从购物车而来
            if (from.path == '/shopcart') {
                next()
            } else next(false)
        }
    },
    {
        path: '/pay',
        component: () => import("@/pages/Pay/Pay.vue"),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade')
                next()
            else next(false)
        }

    },
    {
        path: '/paysuccess',
        component: () => import("@/pages/PaySuccess/PaySuccess"),
        meta: {
            show: true
        }
    },
    {
        path: '/center', //斜杠前不能有空格
        component: () => import("@/pages/Center/Center"),
        meta: {
            show: true
        },
        children: [
            {
                path: 'myorder',
                component: () => import("@/pages/Center/MyOrder/MyOrder")
            },
            {
                path: 'grouporder',
                component: () => import("@/pages/Center/GroupOrder/GroupOrder")
            },
            {
                path: "/center",
                redirect: "/center/myorder"
            }
        ]
    }
]