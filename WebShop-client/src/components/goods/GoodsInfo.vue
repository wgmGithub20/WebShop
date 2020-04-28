<template>
    <div class="goodsinfo">
        <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" fixed />

        <!-- 轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 给轮播图传递一个属性以控制width的宽度 -->
                    <myswiper :lunbotuList="lunbotuList" :isfull="false" v-on:mypreview="fapreview" />
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">
                <span class="price">￥{{goods.price}}&nbsp;</span>
                <span class="sell">月销{{goods.sell}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhengpin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-baoyou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fangxingyunfeixian"></use>
                </svg>

            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="title">{{goods.name}}</p>
                    {{goods.content}}
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">产品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>生产企业：{{goods.company}}</p>
                    <p>产品型号：{{goods.type}}</p>
                    <p>上市时间：{{goods.time}}</p>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">图文介绍</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 图片懒加载 -->
                    <img class="detail" v-for="(img, index) in imageList" v-lazy="img" :key="index" />
                </div>
            </div>
        </div>

        <van-goods-action class="mygoods">
            <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button type="info" text="选择规格" @click="onClickButtonStart" />

        </van-goods-action>

        <!-- 商品规格 -->
        <van-overlay :show="show" @click="show = false" :lock-scroll=true z-index="99">
            <div class="wrapper">
                <div class="block" @click.stop>
                    <div>
                        <van-radio-group v-model="colour" direction="horizontal">
                            颜色：
                            <van-radio name="星夜黑">星夜黑 </van-radio>
                            <van-radio name="樱花粉" disabled>樱花粉 </van-radio>
                        </van-radio-group>
                    </div>
                    <div>
                        <van-radio-group v-model="version" direction="horizontal">
                            版本：
                            <van-radio name="标配版">标配版</van-radio>
                            <van-radio name="旗舰版" disabled>旗舰版</van-radio>
                        </van-radio-group>
                    </div>
                    购买数量：
                    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='1000'>
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="subOne">-</button>
                        <input id="test" class="mui-input-numbox" type="number" :value="num" ref="num" />
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="addOne">+</button>
                    </div>
                    <van-goods-action class="mygoods">
                        <van-goods-action-button color="#1CBCFA" type="info" text="加入购物车" @click="onToShopCat" />
                        <van-goods-action-button type="info" text="立即购买" @click="buy" />
                    </van-goods-action>
                </div>

            </div>
        </van-overlay>
    </div>
</template>

<script>
// import mui from '../../lib/MUI/js/mui'
//轮播图子组件
import myswiper from '../myswiper/swiper.vue'
// 图片预览
import { ImagePreview } from 'vant'

export default {
    data() {
        return {
            goods: {}, //商品数据
            lunbotuList: [], //轮播图数据
            id: this.$route.params.id * 1,
            show: false,
            colour: '星夜黑',
            version: '标配版',
            imageList: [], //图文详情数据
            num: 1
        }
    },
    methods: {
        //数量减一
        subOne() {
            if(this.num == 1){
                return true
            }else{
                this.num--
            }
        },
        // 数量加一
        addOne() {
            this.num++
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        onClickIcon() {
            Toast('点击图标')
        },
        onClickButtonStart() {
            // this.$toast.success('成功文案')
            this.show = true
        },
        //添加到购物车
        onToShopCat() {
            this.show = false
            this.$toast.success('添加成功')
            //数量
            var num = this.$refs.num.value * 1

            console.log(num, this.colour, this.version)
            //拼接一个保存到store里car的商品对象
            var goodsinfo = {
                id: this.id,
                name: this.goods.name,
                count: this.$refs.num.value * 1,
                price: this.goods.price,
                colour: this.colour,
                version: this.version,
                selected: true,
                img:this.lunbotuList[0].img
            }

            this.$store.commit('addCar', goodsinfo)
        },
        buy() {
            this.show = false
            var num = this.$refs.num.value * 1
            console.log(num, this.radio, this.radio2)
        },
        //图片预览
        fapreview(e) {
            // console.log(this.lunbotuList[e].img)
            var pre = []
            this.lunbotuList.forEach(function(item) {
                pre.push(item.img)
            })

            ImagePreview({
                images: pre,
                closeable: true
            })
        },
        //根据id获取商品信息
        async getgoodsbyid(id) {
            var result = await this.axios.get('/api/getgoodsbyid', {
                params: {
                    id: id
                }
            })

            if (result.data.code == 0) {
                this.goods = result.data.message
                this.lunbotuList = result.data.message.swiper
                this.imageList = result.data.message.detailimages
                console.log(this.goods)
            } else {
                this.$toast.fail('请稍后重试！')
            }
        }
    },
    components: {
        myswiper
    },
    created() {
        // var obj = [
        //     { img: 'http://localhost:3000/images/goodsList/04.jpg' },
        //     { img: 'http://localhost:3000/images/goodsList/04.jpg' },
        //     { img: 'http://localhost:3000/images/goodsList/04.jpg' }
        // ]
        // this.lunbotuList = obj
        this.getgoodsbyid(this.id)
    },
    mounted() {
        // mui('.mui-numbox').numbox()
    }
}
</script>

<style lang="less" >
.goodsinfo {
    padding-top: 46px;
    position: relative;
}
.goodsinfo {
    background-color: #eee;
    overflow: hidden;
}
.mygoods {
    z-index: 50;
}
.mui-card-header {
    .price {
        color: red;
        font-size: 20px;
    }

    .sell {
        font-size: 14px;
        color: #727781;
    }
}

.mui-card {
    .mui-card-content-inner {
        padding: 9px;
        .detail {
            width: 100%;
        }
    }
    .title {
        color: black;
        font-size: 16px;
        font-weight: 900;
        margin: 0px;
    }
}

/* 遮罩层 */
.wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.wrapper {
    vertical-align: bottom;
}
.block {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    padding: 10px;
    border-radius: 15px 15px 0 0;
    background-color: #fff;
    vertical-align: bottom;
}
.van-radio-group--horizontal {
    padding: 10px;
}
</style>
