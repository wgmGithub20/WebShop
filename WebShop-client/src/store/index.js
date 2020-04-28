import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        car: [], //购物车
        userInfo: {} // 用户信息
    },
    mutations: {
        //保存商品对象到store.car
        addCar(state, goodsinfo) {
            //标记
            var flag = false
            state.car.some(item => {
                //如果car中已存在，加上数量即可
                if (
                    item.id == goodsinfo.id &&
                    item.colour == goodsinfo.colour &&
                    item.version == goodsinfo.version
                ) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            //如果没找到
            if (!flag) {
                state.car.push(goodsinfo)
            }

            //持久化到本地存储
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        // 更新car中count的数量
        updateCount(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //根据id移除商品
        removeById(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //根据id更新selected
        updateSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        //记录用户信息
        recordUser(state, userInfo) {
            state.userInfo = userInfo
        },
        //重置用户信息
        restUserInfo (state) {
            state.userInfo = {}
        }
        
    },
    getters: {
        // 获得购物车商品总数目
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        //获取选中状态
        getSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        //获得总价和总数
        getCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += parseInt(item.price) * parseInt(item.count)
                }
            })
            return o
        }
    },
    actions: {
        //同步记录用户信息
        synchronizationRecordUser(context, userInfo) {
            context.commit('recordUser', userInfo)
        },

        //异步获取用户信息
        async asyncGetUserInfo (context) {
            var result = await Vue.axios.get('/userinfo')
            // console.log(result.data.data);
            if (result.data.success) {
                var userInfo = result.data.data
                context.commit('recordUser', userInfo)
            }
        },
        //异步退出登录
        async asyncLogout (context) {
            var result = await Vue.axios.get('/logout')
            if (result.data.success) {
                context.commit('restUserInfo')
            }
        }
    },
    modules: {}
})
