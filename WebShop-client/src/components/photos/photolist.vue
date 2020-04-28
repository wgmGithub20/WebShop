<template>
    <div class="pl">
        <!-- 顶部滑动区域 -->
        <van-tabs v-model="active" animated swipeable>
            <van-tab title="标签 1">内容 1</van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">内容 4</van-tab>
            <van-tab title="标签 1">内容 1</van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0
        }
    }
}
</script>
<style lang="less">
.pl{
    // overflow: hidden;
    width: 100%;
}
.van-tabs__line {
    background-color: #05b7fa
}
.van-tab--active .van-tab__text {
    color:#05b7fa
}
</style>
