<template>
    <div class="showlist">
        <van-nav-bar title="秀广场" left-arrow @click-left="onClickLeft" fixed />

        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
        <div class="mui-card" v-for="(item, id) in showlist" :key="id">
            <div class="mui-card-header mui-card-media">
                <img :src="item.head">
                <div class="mui-media-body">
                    {{item.user_name}}
                    <p>发表于 {{ item.add_time | dataFormat("YYYY-MM-DD") }}</p>
                </div>
            </div>
            <div class="mui-card-content">
                <!-- 图片懒加载 -->
                <img v-lazy="item.img[0]" class="lan" />
            </div>
            <van-collapse v-model="activeNames" accordion>
                <van-collapse-item title="查看" name="1">{{item.content}}</van-collapse-item>
            </van-collapse>
            <div class="mui-card-footer">
                <a class="mui-card-link">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zan"></use>
                    </svg>
                </a>
                <a class="mui-card-link">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pinglun"></use>
                    </svg>
                </a>
                <a class="mui-card-link" @click="share">
                    <!-- <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">进去看看</button> -->
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fenxiang"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showlist: [],
            activeNames: '',
            showShare: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' }
            ]
        }
    },
    methods: {
        async getshow() {
            var result = await this.axios.get('/api/getshow')
            this.showlist = result.data.message
        },
        onSelect(option) {
            Toast(option.name)
            this.showShare = false
        },
        share() {
            this.showShare = true
        },
        onClickLeft() {
            this.$router.go(-1)
        }
    },
    created() {
        this.getshow()
    }
}
</script>
<style>
.showlist {
    padding-top: 46px;
}
.lan {
    width: 100%;
}
.van-cell__title span {
    color: #007aff;
}
.icon {
    width: 2em;
    height: 1.2em;
}
</style>
