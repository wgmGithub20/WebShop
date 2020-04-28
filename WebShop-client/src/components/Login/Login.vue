<template>
    <section class="loginContainer">
        <div class="loginInner">
            <!-- 顶部导航 -->
            <a href="javascript:" class="go_back" @click="$router.back()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-right"></use>
                </svg>
            </a>
            <div class="login_header">
                <h2 class="login_logo">Web Shop</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:LoginWay}" @click="LoginWay = true">短信登录</a>
                    <a href="javascript:;" :class="{on:!LoginWay}" @click="LoginWay = false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login()">
                    <div :class="{on:LoginWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}"
                                @click.prevent="getCode()">{{computeTime>0 ? `已发送(${computeTime}s)`:'获取验证码'}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：<br>未注册帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                            和
                            <a href="javascript:;">《隐私政策》</a>
                        </section>
                    </div>
                    <div :class="{on:!LoginWay}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="18" placeholder="密码" v-model="pwd" v-if="showPwd">
                                <input type="password" maxlength="18" placeholder="密码" v-model="pwd" v-else>
                                <div class="switch_button off" @click="showPwd= !showPwd" :class="showPwd?'on':'off'">
                                    <div class="switch_circle" :class="{right:showPwd}"></div>
                                    <span class="switch_text">{{showPwd?'abc': '...'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <span v-html="test"></span>
                                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                                <img class="get_verification" ref="captcha" src="http://localhost:3000/captcha"
                                    alt="captcha" @click="getCaptcha()">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>

        </div>
    </section>
</template>

<script>
//弹窗
import { Dialog } from 'vant'
export default {
    data() {
        return {
            LoginWay: true, //true为短信登录，false为密码登录
            phone: '', //手机号
            computeTime: 0, //验证码倒计时
            showPwd: false, //是否显示密码
            pwd: '', //密码
            code: '', //短信验证码
            name: '', //用户名
            captcha: '', //图形验证码
            test: ''
        }
    },
    computed: {
        //正则检查手机号码返回一个布尔类型
        rightPhone() {
            return /^1\d{10}$/.test(this.phone)
        }
    },
    methods: {
        //提示框
        showAlert(message) {
            Dialog.alert({
                title: '提示',
                message: message
            }).then(() => {})
        },
        //获取验证码
        getCode() {
            //如果没有计时
            if (!this.computeTime) {
                //计时
                this.computeTime = 60
                var intervalid = setInterval(() => {
                    this.computeTime--
                    if (this.computeTime <= 0) {
                        clearInterval(intervalid)
                        this.computeTime = 0
                    }
                }, 1000)
                //请求
            }
        },
        //登录
        async login() {
            if (this.LoginWay) {
                //短信登录
                const { phone, code, rightPhone } = this
                if (!rightPhone) {
                    //手机号不正确
                    this.showAlert('请输入正确的手机号')
                } else if (!/^\d{6}$/.test(code)) {
                    //验证码位数不正确
                    this.showAlert('验证码必须是6为数字')
                }
            } else {
                //密码登录
                const { name, pwd, captcha } = this
                if (!name) {
                    //用户名为空
                    this.showAlert('用户名不能为空')
                } else if (!pwd) {
                    //密码为空
                    this.showAlert('密码不能为空')
                } else if (!captcha) {
                    //图形验证码位数不正确
                    this.showAlert('验证码不能为空')
                }
                //发送ajax
                var result = await this.axios.post(
                    '/loginByPwd',
                    {
                        name,
                        pwd,
                        captcha
                    },
                    { withCredentials: true }
                )

                console.log(result)
                if (result.data.success) {
                    const user = result.data.data
                    // 将user保存到vuex的state
                    // console.log(user);
                    this.$store.dispatch('synchronizationRecordUser', user)
                    // 去个人中心界面
                    this.$router.replace('/member')
                    console.log(this.$store.state.userInfo);
                } else {
                    // 显示新的图片验证码
                    this.getCaptcha()
                    // 显示警告提示
                    this.showAlert(result.data.msg)
                }
            }
        },
        //每次点击更新图形验证码
        async getCaptcha() {
            this.$refs.captcha.src =
                'http://localhost:3000/captcha?' + Date.now()
        }
    },
    mounted() {
        this.getCaptcha()
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/mixins.less';

.loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;

    .loginInner {
        padding-top: 60px;
        width: 80%;
        margin: 0 auto;

        .login_header {
            .login_logo {
                font-size: 40px;
                font-weight: bold;
                color: #008cff;
                text-align: center;
            }

            .login_header_title {
                padding-top: 40px;
                text-align: center;

                > a {
                    color: #333;
                    font-size: 14px;
                    padding-bottom: 4px;

                    &:first-child {
                        margin-right: 40px;
                    }

                    &.on {
                        color: #008cff;
                        font-weight: 700;
                        border-bottom: 2px solid #008cff;
                    }
                }
            }
        }

        .login_content {
            > form {
                > div {
                    display: none;

                    &.on {
                        display: block;
                    }

                    input {
                        width: 100%;
                        height: 100%;
                        padding-left: 10px;
                        box-sizing: border-box;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        outline: 0;
                        font: 400 14px Arial;

                        &:focus {
                            border: 1px solid #008cff;
                        }
                    }

                    .login_message {
                        position: relative;
                        margin-top: 16px;
                        height: 48px;
                        font-size: 14px;
                        background: #fff;

                        .get_verification {
                            position: absolute;
                            top: 50%;
                            right: 10px;
                            transform: translateY(-50%);
                            border: 0;
                            color: #ccc;
                            font-size: 14px;
                            background: transparent;
                            &.right_phone {
                                color: #008cff;
                            }
                        }
                    }

                    .login_verification {
                        position: relative;
                        margin-top: 16px;
                        height: 48px;
                        font-size: 14px;
                        background: #fff;

                        .switch_button {
                            font-size: 12px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            transition: background-color 0.3s, border-color 0.3s;
                            padding: 0 6px;
                            width: 30px;
                            height: 16px;
                            line-height: 16px;
                            color: #fff;
                            position: absolute;
                            top: 50%;
                            right: 10px;
                            transform: translateY(-50%);

                            &.off {
                                background: #fff;

                                .switch_text {
                                    float: right;
                                    color: #ddd;
                                }
                            }

                            &.on {
                                background: #008cff;
                            }

                            > .switch_circle {
                                // transform translateX(27px);
                                position: absolute;
                                top: -1px;
                                left: -1px;
                                width: 16px;
                                height: 16px;
                                border: 1px solid #ddd;
                                border-radius: 50%;
                                background: #fff;
                                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                                transition: transform 0.3s;
                                &.right {
                                    transform: translateX(20px);
                                }
                            }
                        }
                    }

                    .login_hint {
                        margin-top: 12px;
                        color: #999;
                        font-size: 14px;
                        line-height: 20px;

                        > a {
                            color: #008cff;
                        }
                    }
                }

                .login_submit {
                    display: block;
                    width: 100%;
                    height: 42px;
                    margin-top: 30px;
                    border-radius: 4px;
                    background: #008cff;
                    color: #fff;
                    text-align: center;
                    font-size: 16px;
                    // line-height: 42px;
                    border: 0;
                }
            }

            .about_us {
                display: block;
                font-size: 12px;
                margin-top: 20px;
                text-align: center;
                color: #999;
            }
        }

        .go_back {
            position: absolute;
            top: 13px;
            left: 5px;
            width: 30px;
            height: 30px;

            > .iconfont {
                font-size: 20px;
                color: #999;
            }
        }
    }
}
</style>

