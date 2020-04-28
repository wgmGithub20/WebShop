<template>
    <div class="newslist">
        <van-nav-bar title="新闻咨询" left-arrow @click-left="onClickLeft" fixed />

        <ul class="mui-table-view">

            <li class="mui-table-view-cell mui-media" v-for="(item, index) in newsList" :key="index">
                <router-link :to="'/home/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dataFormat("YYYY-MM-DD")}}</span>
                            <span>阅读量：{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newsList: []
        }
    },
    methods: {
        getNewsList: async function() {
            var result = await this.axios.get('/api/getnews')
            // console.log(result.data.news)
            this.newsList = result.data.news
        },
        onClickLeft() {
            this.$router.go(-1)
        }
    },
    created: function() {
        this.getNewsList()
    }
}
</script>
<style lang="less" scoped>
.newslist {
    padding-top: 46px;
}
/* 列表 */
.mui-ellipsis {
    display: flex;
    justify-content: space-between;
}
</style>
