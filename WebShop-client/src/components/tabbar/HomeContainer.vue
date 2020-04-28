<template>
    <div class="homeContainer">
        <!-- 顶部 -->
        <mt-header fixed title="Web Shop"></mt-header>
        <!-- 轮播图 -->
        <!-- lunbotuList传递一个图片数组 -->
        <!-- isfull给轮播图传递一个属性以控制width的宽度 -->
        <myswiper :lunbotuList="lunbotuList" :isfull="true" />

        <!-- 导航 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist" >
                    <span class="mui-icon ">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-xinwen"></use>
                        </svg>
                    </span>
                    <div class="mui-media-body">新闻咨询</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/showlist" >
                    <span class="mui-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tupian"></use>
                        </svg>
                        <!-- 徽标 -->
                        <!-- <span class="mui-badge">5</span> -->
                    </span>
                    <div class="mui-media-body">秀广场</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/gooodslist" >
                    <span class="mui-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shangpin"></use>
                        </svg>
                    </span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-meishi"></use>
                        </svg>
                    </span>
                    <div class="mui-media-body">天天美食</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-chaoshi"></use>
                        </svg>
                    </span>
                    <div class="mui-media-body">生鲜超市</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wodefuwuicon_chongzhizhongxin"></use>
                        </svg>
                    </span>
                    <div class="mui-media-body">充值中心</div>
                </a></li>
            
        </ul>
        <!-- 列表 -->
        <!-- <gooodslist /> -->

    </div>
</template>
<script>
import gooodslist from '../goods/GoodsList'
import myswiper from '../myswiper/swiper'
export default {
    data() {
        return {
            lunbotuList: []
        }
    },
    created: async function() {
        var result = await this.axios.get('/api/getlunbo')
        this.lunbotuList = result.data.message
    },
    methods: {
        getMock() {
            // console.log(111);
            this.axios.get('/getgoodsList').then(function(data) {
                console.log(data.data.message)
            })
        }
    },
    components: {
        // gooodslist
        myswiper
    }
}
</script>
<style lang="less" >
.homeContainer {
    padding-top: 40px;
}
.mint-header-title {
    font-size: 20px !important;
}
// /* 轮播图 */
// .mint-swipe {
//     height: 200px !important;
//     img {
//         width: 100%;
//         height: 100%;
//     }
// }

/* 导航 */
.mui-grid-view.mui-grid-9 {
    background-color: white;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    padding: 0 15px !important;
}
.mui-table-view.mui-grid-view .mui-table-view-cell {
    font-size: 15px !important;
}
.mui-media-body {
    font-size: 13px;
}
</style>
