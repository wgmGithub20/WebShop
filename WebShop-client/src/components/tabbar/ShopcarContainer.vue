<template>
    <div class="shopcar">
        <!-- 顶部 -->
        <mt-header fixed title="购物车"></mt-header>
        <!-- 购物车列表 -->
        <div class="mui-card" v-for="(item, index) in carGoods" :key="index">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">

                    <!-- <mt-switch v-model="$store.getters.getSelected[item.id]" ></mt-switch> -->

                    <van-switch v-model="item.selected" size="15px" @click="changeSelected(item.id, index)" />
                    <!-- <van-switch v-model="$store.getters.getSelected[item.id]" size="15px" /> -->
                    <!-- <mt-switch v-model="$store.getters.getSelected[item.id]"></mt-switch> -->
                    <img :src="item.img" alt="">
                    <div class="info">
                        <h1>{{item.name}}</h1>
                        <h1><span>{{item.colour}}&nbsp;</span><span>&nbsp;{{item.version}}</span></h1>
                        <p>
                            <span class="price">￥{{item.price}}&nbsp;</span>
                            <span>
                                <div class="mui-numbox" data-numbox-min='1' data-numbox-max='1000' style="height:25px">
                                    <button class="mui-btn mui-btn-numbox-minus" type="button"
                                        @click="subOne(index)">-</button>
                                    <input id="test" class="mui-input-numbox" type="number" :value="item.count"
                                        ref="numbox" readonly :change="numChange"  />
                                    <button class="mui-btn mui-btn-numbox-plus" type="button"
                                        @click="addOne(index)">+</button>
                                </div>
                            </span>
                            <a href="#" @click.prevent="remove(item.id, index)">&nbsp;移除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算 -->
        <div class="mui-card account-box">
            <div class="mui-card-content">
                <div class="mui-card-content-inner account">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getCountAndAmount.count}}</span> 件，总价：<span
                                class="red">￥{{$store.getters.getCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            checked: true,
            num: 1,
            carGoods: []
        }
    },
    mounted() {
        // mui('.mui-numbox').numbox()
    },
    created() {
        this.getgooods()
    },
    methods: {
        //改变选中状态
        changeSelected(id, index) {
            // console.log(this.carGoods[index].selected)
            this.carGoods[index].selected = !this.carGoods[index].selected
            //更新store中car的selected
            this.$store.commit('updateSelected', {
                id: id,
                selected: this.carGoods[index].selected
            })
        },
        //移除购物车中的商品
        remove(id, index) {
            this.carGoods.splice(index, 1)
            this.$store.commit('removeById', id)
        },
        //数量改变时
        numChange() {
            console.log(this.$refs.numbox)
        },
        //数量减一
        subOne(index) {
            if (this.carGoods[index].count == 1) {
                return true
            } else {
                this.carGoods[index].count--
                console.log(this.carGoods[index].count)
                //同步到store的car中
                this.$store.commit('updateCount', {
                    id: this.carGoods[index].id,
                    count: this.carGoods[index].count
                })
            }
        },
        // 数量加一
        addOne(index) {
            this.carGoods[index].count++
            console.log(this.carGoods[index].count, this.carGoods[index].id)
            //同步到store的car中
            this.$store.commit('updateCount', {
                id: this.carGoods[index].id,
                count: this.carGoods[index].count
            })
        },
        //从本地获取购物车商品对象
        getgooods() {
            var goods = JSON.parse(localStorage.getItem('car'))
            this.carGoods = goods
        }
    }
}
</script>
<style lang="less">
.shopcar {
    height: 100%;
    padding-top: 46px;
    .top-col {
        background-color: red;
    }

    .mui-card-content-inner {
        img {
            width: 55px;
            height: 55px;
        }
    }

    .mui-card {
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }
        h1 {
            font-size: 14px;
        }
        .info {
            p {
                margin-bottom: 0;
                .price {
                    color: red;
                    font-weight: bold;
                }
                .mui-numbox {
                    margin: 0 10px;
                }
            }
        }
    }

    .account {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
            color: red;
        }
    }
}
</style>
