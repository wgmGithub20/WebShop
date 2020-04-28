import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' 
import axios from 'axios'
import VueAxios from 'vue-axios'
import FastClick from 'fastclick'


import '../src/mock/mock.js'
// mint-ui样式
import 'mint-ui/lib/style.css'
// mui样式
import './lib/MUI/css/mui.css'

// vant样式
import 'vant/lib/index.css'

// 按需导入mint-ui组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
// 安装导入的组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(Button.name, Button)
Vue.component(SwipeItem.name, SwipeItem)

//导入格式化时间插件
import monent from 'moment'
// import format from 'date-fns/format'

//搜索
import { Search } from 'vant';
Vue.use(Search);

//输入框
import { Field } from 'vant'
Vue.use(Field)

// Tab 标签页
import { Tab, Tabs } from 'vant'
Vue.use(Tab)
Vue.use(Tabs)

//图片懒加载
import { Lazyload } from 'vant'
Vue.use(Lazyload)

//折叠面板
import { Collapse, CollapseItem } from 'vant'
Vue.use(Collapse)
Vue.use(CollapseItem)

//分享面板
import { ShareSheet } from 'vant'
import { Toast } from 'vant'
Vue.use(ShareSheet)
Vue.use(Toast);

//顶部导航
import { NavBar } from 'vant'
Vue.use(NavBar)

//商品导航
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)

//遮罩层
import { Overlay } from 'vant';
Vue.use(Overlay);

//单选框
import { RadioGroup, Radio } from 'vant';
Vue.use(Radio);
Vue.use(RadioGroup);

//switch开关
import { Switch } from 'vant';
Vue.use(Switch);


/* ******************************************************** */
//解决移动端300毫秒延迟
FastClick.attach(document.body);


//定义全局过滤器
//第一种：使用monentjs
Vue.filter('dataFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return monent(dataStr).format(pattern)
})
//第二种：使用date-fns
// Vue.filter('dataFormat', function(dataStr, pattern) {
//     return format(dataStr,pattern)
// })


Vue.use(VueAxios, axios)
// 设置基址
axios.defaults.baseURL = 'http://localhost:3000/'
//设置axios携带Cookie
axios.defaults.withCredentials = true

Vue.config.productionTip = false

// 进入首页就初始化购物车
store.state.car = JSON.parse(localStorage.getItem('car') || '[]')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
