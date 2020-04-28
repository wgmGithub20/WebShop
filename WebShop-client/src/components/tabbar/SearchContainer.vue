<template>
    <div>
        <van-search v-model="value" shape="round" background="#008cff" placeholder="请输入搜索关键词" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: ''
        }
    }
}
</script>
<style lang="less">
.van-search {
    height: 50px;
}
.van-field__control {
    margin-bottom: 0 !important;
    padding: 5px !important;
}
.van-field__left-icon {
    display: none;
}
</style>
