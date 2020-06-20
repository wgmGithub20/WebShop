# 简介

### 1.项目描述

- 此项目是一个前后端分离的单页Web应用(SPA)，是一个打通前后端流程的一个项目
- 技术栈：Vue.js+ES6+Vant+Node.js+ Express+ MongoDB
- 包括热点资讯，买家秀，商品，购物车，用户等多个子模块
- 采用模块化、组件化、工程化的模式开发

### 2.项目结构说明

WebShop-client是前台项目，WebShop-server是后台项目

#### 2.1WebShop-client

```
|--dist：npm run build 命令打包的项目文件
|--node_moudles：存放项目的各种依赖
|--public：存放静态资源
	|--index.html：是一个模板文件，作用是生成项目的入口文件
|--src：存放各种vue文件的地方
	|--assets：存放着各种静态文件，比如图片
    |--components：存放组件
		|--commemt：评论组件文件夹
        |--goods：商品组件文件夹
        |--login：登录组件文件夹
        |--myswiper：轮播图组件文件夹
        |--news：新闻咨询组件文件夹
        |--tabbar：底部栏组件文件夹
        |--photos：买家秀组件文件夹
    |--mock：模拟数据接口文件夹
    |--router:路由器文件夹
	|--store：vuex的文件，主要用于项目里边的一些状态保存
    |--views：存放写好的各种页面
    |--App.vue：项目的主组件
    |--main.js：js入口文件
|--.browserslistrc
|--.editorconfig：通过编辑器的编码/格式进行一定的配置
|--.eslint.js：eslint 检查的配置
|--.gitignore：配置git上传想要忽略的文件格式
|--.prettierrc：代码格式化配置
|--babel.config.js：babel的配置文件
|--LICENSE：开源协议
|--package.json：应用包配置文件
|--postcss.config.js：postcss配置文件
|--README.md：应用描述说明的 readme 文件
|--vue.config.js：webpack配置文件，默认是没有的，需要自己创建
```

### 3.运行项目

#### 3.1准备工作

- 确保安装了node环境，查看是否已经安装: node -v

- 确保安装了mongodb, 并启动了对应的服务

#### 3.2启动后台应用

- WebShop-server文件夹下cmd命令：

- npm install

- npm start

#### 3.3启动前台应用

- WebShop-client文件夹下cmd命令：
- npm install
- npm run serve或npm run build

####  3.4 补充

- 开发环境打包 npm run serve
- 生产环境打包 npm run build
- ESLint语法检查和修正 npm run lint
- 生成打包报告 npm run build --report

### 4.项目优化

对项目做了一些优化 ，总结以下几点

####  4.1keep-alive 缓存组件对象

keep-alive 是 Vue 的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM。

```javascript
<keep-alive>
    <!--这里是会被缓存的组件-->
    <router-view></router-view>
</keep-alive>
```

#### 4.2路由组件懒加载

```javascript
{
        path: '/login',
        component: () => import('../components/Login/Login.vue')
}
```

#### 4.3图片懒加载

- 安装vue-lazyload插件

```javascript
npm install vue-lazyload --save-dev
```

- main.js引入插件

```javascript
 import VueLazyLoad from 'vue-lazyload'
 Vue.use(VueLazyLoad,{
     preLoad: 1.3,
     error:'./static/error.png',
     loading:'./static/loading.png',
     attempt: 1
 })
```

- vue文件中将需要懒加载的图片绑定 v-bind:src 修改为 v-lazy

```javascript
<img class="item-pic" v-lazy="newItem.picUrl"/>
```

- vue文件中需要懒加载的背景图片，v-lazy:background-image="imgUrl"

#### 4.4日期格式化 使用data-fns代替moment

- 安装data-fns

```javascript
 npm install --save date-fns
```

- 引入并自定义过滤器

```javascript
import format from 'date-fns/format'
 Vue.filter('date-format', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
 return format(dataStr,pattern)
 })
```

- 使用

```html
<div  class="time">{{rating.rateTime|date-format}}</div>
```

#### 4.5解决移动端300毫秒点击延迟

- 第一种：禁用缩放并设置视口宽度为物理宽度 在html头部设置meta标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
```

- 第二种：FastClick

  - 在vue中使用

    ```javascript
    //安装
    npm install fastclick --save
    //引入
    import FastClick from 'fastclick'
    //使用
    FastClick.attach(document.body);
    ```

  - 在js中使用

    ```javascript
    <script type='application/javascript' src='/path/to/fastclick.js'></script>
    // 使用了jquery的时候
       $(function() {
            FastClick.attach(document.body);
        });
    // 使用原生js的时候
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    ```

#### 4.6屏幕适配px2vw 单位转化(使用postcss-px-to-viewport插件)

- 安装

```javascript
npm i postcss-px-to-viewport --save-dev
```

- 配置postcss.config.js

```javascript
module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        viewportWidth: 375, //视口的宽度，对应的时设计稿的宽度/2，一般为750
        viewportHeight: 667, //视口的高度，对应的是设计稿的高度（也可以不配置）
        unitPrecision: 5, //指定‘px’转换为视口单位值的小数位数（很多时候无法整除）
        viewportUnit: 'vw', //指定需要转换成的视口单位，建议使用vw
        selectorBlankList: ['ignore', 'tab-bar'], //指定不需要转换的类
        minPixelValue: 1, //小于或等于‘1px’不转换为视口单位
        mediaQuery: true,//允许在媒体查询中转换为‘px’,false为不使用媒体查询转换
        exclude:[/HomeContainer/]  //不需要转化的组件文件名正则，必须是正则表达式
      }
    }
}
```

#### 4.7生产环境移除console(使用babel-plugin-transform-remove-console插件)

- 安装

```javascript
npm install babel-plugin-transform-remove-console --save-dev
```

- 配置babel.config.js

```javascript
const prodPlugins = []
if(process.env.NODE_ENV === 'production') {
  prodPlugins.push("transform-remove-console")
}

module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        ...prodPlugins
    ]
}
```

#### 4.8对密码进行md5加密 使用blueimp-md5加密

#### 4.9优化登录创建防攻击验证码 node使用svg-captcha

### 5.其他

#### 5.1弹性布局的几个属性 align-items align-content justify-content align-self

 需要配合 display: flex;使用

- align-items（在父元素设置）属性适用于所有的 flex 容器，它是用来设置每个 flex 元素在侧轴上的默认对齐方式
- align-items（在父元素设置）和 align-content 有相同的功能，align-content 属性只适用于多行的 flex 容器
- align-items（在父元素设置）是针对一行的情况进行排列，align-content 是针对 flex 容器里面多轴(多行)的情况
- align-self（在子元素设置） 定义 flex 子项单独在侧轴（纵轴）方向上的对齐方式。
- justify-content（在父元素设置） 设置子元素在主轴（横轴）的对齐方式。
  - 1.flex-start(默认值) 左对齐
  - 2.flex-end 右对齐
  - 3.center 居中
  - 4.sapce-between 两端对齐，子元素之间的间距相等
  - 5.space-around 每个子元素两侧的间距相等。

#### 5.2关于session

1. 为什么需要用 session？

   客户端发送请求到服务端建立一个连接，请求得到响应后连接即中断，服务器端不会记录状态，因此服务器端想要确定是哪个客户端提交过来的请求，就必须要借助一些东西去完成：session 和 cookies。

2. Cookie 和 Session 区别
   - cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
   - cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗 考虑到安全应当使用 session。
   - session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用 COOKIE。
   - 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。

#### 5.3前端要携带 cookie 到服务端，需要三个条件

1. Access-Control-Allow-Origin 不能为\*，应为具体域名
2. 服务端 Access-Control-Allow-Credentials 应为 true
3. 客户端 XMLHttpRequest 的 withCredentials=true

#### 5.4关于 cookie 丢失 session 取值为 undefined 的问题

虽然 axios 配置了 axios.defaults.withCredentials = true，由于我使用了 Mockjs，Mockjs 会拦截所有 ajax 请求，覆盖 axios 配置，对于跨域请求，Mockjs 是不携带 cookie 的，如果需要携带 cookie 配置 Mock.XHR.prototype.withCredentials = true 即可

#### 5.5使用 mockjs 模拟后端接口数据

```javascript
npm i mockjs
import Mock from 'mockjs'
Mock.mock(url, data) //url为拦截的ajax请求，data为返回的数据
```

