<template>
    <div class='app-container'>

        <!-- 中间路由显示区域 -->
        <div class="mid">

            <transition>
                <!-- <keep-alive> -->
                    <!-- 缓存路由组件对象 -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </transition>

        </div>

        <!-- 底部栏 -->
        <nav class="mui-bar mui-bar-tab" v-show="$route.meta.showBottombar">
            <router-link class="mui-tab-item " to="/home">
                <span class="mui-icon iconfont icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>

            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon iconfont icon-sousuo"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>

            <router-link class="mui-tab-item" to="/shopcat">
                <span class="mui-icon iconfont icon-gouwuchekong"><span
                        class="mui-badge">{{this.$store.getters.getAllCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>

            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon iconfont icon-gerenfill"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>

        </nav>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['asyncGetUserInfo'])
    },
    mounted() {
        this.asyncGetUserInfo()
    }
}
</script>
<style >
.app-container {
    /* padding-top: 40px; */
    padding-bottom: 64px;
    overflow-x: hidden;
}
.mint-header {
    z-index: 99;
}

/* 进入前 */
.v-enter {
    opacity: 0;
    transform: translateX(100%);
}
/* 离开后 */
.v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
/* 进入时 离开时 */
.v-enter-active,
.v-leave-active {
    transition: all 0.25s ease;
}
</style>
   