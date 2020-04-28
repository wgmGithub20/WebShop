<template>
    <div>
        <van-field v-model="msg" rows="2" autosize label="评论" type="textarea" maxlength="100" placeholder="请输入评论"
            show-word-limit />
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="comment" v-for="(item, index) in comments" :key="index">
            <div class="left">
                <img :src="item.img" alt="">
            </div>
            <div class="right">
                <p>{{item.user_name}}：</p>
                <p>{{item.content}}</p>
            </div>
        </div>

        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
    props: ['id'],
    data() {
        return {
            msg: '',
            pageIndex: 1, // 默认展示第一页数据
            comments: [
                {
                    user_name: '张三',
                    add_time: new Date(),
                    content: '买买买',
                    img:
                        'http://b-ssl.duitang.com/uploads/item/201704/03/20170403140041_xUQBF.thumb.700_0.jpeg'
                },
                {
                    user_name: '李四',
                    add_time: new Date(),
                    content: '真香',
                    img:
                        'http://img.52z.com/upload/news/image/20180927/20180927113620_44798.jpg'
                },
                {
                    user_name: '赵五',
                    add_time: new Date(),
                    content: '占个楼',
                    img:
                        'http://image.biaobaiju.com/uploads/20190805/21/1565011507-gFLrbRVQUH.jpg'
                },
                {
                    user_name: '郑六',
                    add_time: new Date(),
                    content: '哈哈哈哈',
                    img: 'http://img.tukexw.com/img/91d78198dc3ea7b8.jpg'
                }
            ] // 所有的评论数据
        }
    },
    created() {
        // this.getComments()
    },
    methods: {
        async getComments() {
            // 获取评论
            var result = await this.axios.get('/api/getcomments/', {
                params: {
                    id: this.id,
                    pageIndex: this.pageIndex
                }
            })

            this.comments = this.comments.concat(result.body.message)
        },
        getMore() {
            // 加载更多
            this.pageIndex++
            this.getComments()
        },
        //发表评论
        postComment() {
            var msg = this.msg.trim()
            if (msg.length == 0) {
                Dialog({ message: '内容不能为空！' })
            } else {
                Dialog({ message: '发表成功！' })
                var obj = {
                    user_name:"我",
                    add_time: new Date(),
                    content:this.msg,
                    img:'http://img4.imgtn.bdimg.com/it/u=472722738,4004844590&fm=26&gp=0.jpg'
                }
                this.comments.unshift(obj)
                this.msg = ''
            }
        }
    }
}
</script>
<style lang="less" >
.content div {
    font-size: 14px;
}
.comment {
    display: flex;
    margin: 5px;
    .left {
        flex: 12%;
        float: left;
        height: 40px;
        width: 44;
        // background-color: pink;
        img {
            border-radius: 5px;

            height: 30px;
            width: 30px;
            background-color: black;
        }
    }
    .right {
        flex: 88%;
        float: right;
        border-radius: 5px;
        padding: 3px;
        // width: 100%;
        background-color: #f5f0f0;
        p {
            font-size: 10px;
            margin: 0;
        }
    }
}
</style>
