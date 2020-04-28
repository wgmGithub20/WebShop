import Vue from 'vue'
import VueRouter from 'vue-router'
//导入路由组件
import HomeContainer from '../components/tabbar/HomeContainer.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    /* 底部栏路由 */
    //首页
    {
        path: '/home',
        name: 'home',
        meta: {//配置元信息控制底部栏是否显示
            showBottombar: true
        },
        component: HomeContainer
    },
/* 路由懒加载 */
    //我的
    {
        path: '/member',
        name: 'member',
        meta: {
            showBottombar: true
        },
        component: () => import(/* webpackChunkName: "about" */'../components/tabbar/MemberContainer.vue')
    },
    //购物车
    {
        path: '/shopcat',
        name: 'shopcat',
        meta: {
            showBottombar: true
        },
        component: () => import('../components/tabbar/ShopcarContainer.vue')
    },
    //搜索
    {
        path: '/search',
        name: 'search',
        meta: {
            showBottombar: true
        },
        component: () => import('../components/tabbar/SearchContainer.vue')
    },
    // 首页新闻咨询路由
    {
        path: '/home/newslist',
        meta: {
            showBottombar: true
        },
        component: () => import('../components/news/NewsList.vue')
    },
    //新闻详情路由
    {
        path: '/home/newsInfo/:id',
        meta: {
            showBottombar: true
        },
        component: () => import('../components/news/NewsInfo.vue')
    },
    //买家秀路由
    {
        path: '/home/showlist',
        meta: {
            showBottombar: true
        },
        component: () => import('../components/photos/Show.vue')
    },
    //买家秀详情路由
    {
        path: '/show/showContent',
        component: () => import('../components/photos/ShowContent.vue')
    },
    //商品列表
    {
        path: '/home/gooodslist',
        meta: {
            showBottombar: true
        },
        component: () => import('../components/goods/GoodsList.vue')
    },
    //商品详情页
    {
        path: '/home/gooodsinfo/:id',
        component: () => import('../components/goods/GoodsInfo.vue')
    },
    //登录页
    {
        path: '/login',
        component: () => import('../components/Login/Login.vue')
    }
]

const router = new VueRouter({
    routes,
    linkActiveClass: 'mui-active' // 重写路由高亮类
})

export default router
