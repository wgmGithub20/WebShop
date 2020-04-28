<template>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in lunbotuList" :key="index" >
            <img :src="item.img" alt="" :class="{full:isfull}" @click="subpreview(index)">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props: ['lunbotuList', 'isfull'],
    methods: {
        subpreview(index){
            this.$emit('mypreview', index)
        }
    }
}
</script>

<style lang="less" >
/* 轮播图 */
.mint-swipe {
    height: 200px !important;
    text-align: center;
    img {
        // width: 100%;
        height: 100%;
    }
    .full {
        width: 100%;
    }
}
</style>
