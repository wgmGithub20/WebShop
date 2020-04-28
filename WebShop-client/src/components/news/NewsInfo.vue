<template>
    <div class="newsinfo">
        <van-nav-bar title="详情" left-arrow @click-left="onClickLeft" fixed />
        <div class="newsinfo-container">
            <!-- 大标题 -->
            <h3 class="title">{{ newsinfo.title }}</h3>
            <!-- 子标题 -->
            <p class="subtitle">
                <span>时间：{{ newsinfo.add_time | dataFormat("YYYY-MM-DD") }}</span>
                <span>阅读量：{{ newsinfo.click }}</span>
            </p>

            <hr>

            <!-- 内容区域 -->
            <div class="content" v-html="newsinfo.content"></div>

            <div class="fenge"></div>

            <!-- 评论子组件区域 -->
            <comment-box :id="this.id"></comment-box>
        </div>
    </div>
</template>
<script>
import comment from '../comment/Comment.vue'
export default {
    data() {
        return {
            id: '',
            newsinfo: {} // 新闻对象
        }
    },
    created() {
        this.id = this.$route.params.id
        this.getNewsInfo()
    },
    methods: {
        async getNewsInfo() {
            var result = await this.axios.get('/api/getnewsInfo', {
                params: { id: this.id }
            })

            this.newsinfo = result.data.newsInfo
        },
        onClickLeft() {
            this.$router.go(-1)
        }
    },
    components: {
        'comment-box': comment
    }
}
</script>
<style lang="less">
.newsinfo {
    padding-top: 46px;
}
.newsinfo-container {
    padding: 0 4px;
    .title {
        font-size: 16px;
        // text-align: center;
        margin: 15px 0;
        // color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
.fenge {
    // height: 1px;
    border: 1px solid #d8dbdb;
}
</style>
