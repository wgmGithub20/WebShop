<template>

    <div class="goods-list">
        <van-nav-bar title="商品列表" left-arrow @click-left="onClickLeft" fixed />
        <router-link :to="'/home/gooodsinfo/' + item.id" tag="div" class="goods-item" v-for="(item, id) in goodsList"
            :key="id">
            <img :src="item.image" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.price}}</span>
                    <span class="num"> {{item.sell}}人付款</span>
                </p>
                <p class="sell">
                    <span class="tag">{{item.tag}}</span>
                    <span>{{item.addr}}</span>
                </p>
            </div>
        </router-link>

    </div>

</template>

<script>
export default {
    data() {
        return {
            goodsList: []
        }
    },
    methods: {
        async getgoodsList() {
            var result = await this.axios.get('/getgoodsList')
            // console.log(result.data.message)
            this.goodsList = result.data.message
        },
        //返回
        onClickLeft() {
            this.$router.go(-1)
        }
    },
    created() {
        this.getgoodsList()
    }
}
</script>

<style lang="less" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    padding-top: 46px;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.05);

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        border-radius: 10px;
        // box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
            margin: 0;
        }

        .info {
            //   background-color: #eee;
            border-radius: 10px;
            background-color: white;

            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                padding-bottom: 0;
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 17px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
                .num {
                    font-size: 8px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                padding-top: 0;

                .tag {
                    color: red;
                }
            }
        }
    }
}
</style>
