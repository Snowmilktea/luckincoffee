<script>
import { useRouter } from "vue-router"
import { ref } from 'vue';
import $Axios from "../api/http"
import { showToast } from "vant";
import 'vant/es/toast/style';

export default {
    setup() {
        const router = useRouter();
        const onClickRight = () => router.push("/");
        const username = ref('');
        const password = ref('');
        const onSubmit = (values) => {
        console.log('submit', values);
        };


        //登录功能
        let loginUserinfo =ref({
            phone:"",
            password:""
        })
        const submitLogin = (values) => {
            console.log('submit111',values);
            $Axios({
                url:"/login",
                method:"post",
                data:{
                    ...values
                }
            }).then(function(data){
                console.log(data);
                if(data.code == 200){
                    showToast("登陆成功");
                    //token身份令牌
                    //浏览器存储
                    window.localStorage.setItem("token",data.token);
                    //跳转页面
                    router.push("/")//跳转页面
                }else{
                    showToast(data.msg)
                }
            })
        };

        //注册功能
        const show =ref(false);
        let registerUserinfo = ref({
            nickName: "",
            password: "",
            phone: ""
        })
        const submitRegister =(values) => {
            console.log('submit6666',values);

            //请求接口/register
            $Axios({
                url:"/register",
                method:"post",
                data:{
                    ...values
                }
            }).then(function(data){
                console.log(data);
                if(data.code == 100){
                    showToast("注册成功")
                }else{
                    showToast(data.msg)
                }
            })

        };

        return {
            onClickRight,
            loginUserinfo,
            submitLogin,
            show,
            registerUserinfo,
            submitRegister
        };
    },
};
</script>
<template>
    <div class="login">
        <van-nav-bar right-text="首页" @click-right="onClickRight">
            <template #left>
                <div class="img">
                    <img src="../assets/img/home_active.png" alt="">
                </div>
                <p>Luckin Coffee</p>
            </template>
        </van-nav-bar>
        <div class="welcome-title">欢迎回来！</div>
        <div class="welcome-subtitle">Please login to your accounts</div>
        
        <van-form @submit="submitLogin">
            <van-cell-group inset>
                <van-field 
                v-model="loginUserinfo.phone" 
                type="phone"
                name="phone" 
                label="用户名" 
                placeholder="用户名"
                autocomplete="off"
                :rules="[{ required: true, message: '手机号必填' },{pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确'}]"
                />
                <van-field 
                v-model="loginUserinfo.password" 
                type="password" 
                name="password" 
                label="密码" 
                placeholder="密码"
                autocomplete="off"
                :rules="[{ required: true, message: '密码必填' },{ pattern: /^[A-Za-z]\w{5,15}$/, message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位'}]" 
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button class="submit" round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <div class="register">
            <van-button type="default" round block @click="show='true'">注册</van-button>
        </div>
        <!-- 添加注册功能 -->
        <van-popup v-model:show="show" closeable position="bottom" :style="{height: '50%' }">
            <!-- 注册页面 -->
            <h1>注册</h1>
            <van-form @submit="submitRegister">
                <van-cell-group inset>
                    <van-field
                        v-model="registerUserinfo.phone"
                        type="text"
                        name="phone"
                        label="手机号码"
                        placeholder="手机号码"
                        autocomplete="off"
                        :rules="[{ required: true, message: '手机号必填' }, {pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确'}]"
                        />
                     <van-field
                        v-model="registerUserinfo.password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        autocomplete="off"
                        :rules="[{ required: true, message: '密码必填' }, {pattern: /^[A-Za-z]\w{5,15}$/, message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位'}]"
                    />
                    <van-field
                        v-model="registerUserinfo.nickName"
                        type="text"
                        name="nickName"
                        label="昵称"
                        placeholder="昵称"
                        autocomplete="off"
                        :rules="[{ required: true, message: '昵称必填' }, {pattern: /^[A-Za-z\u4e00-\u9fa50-9]{1,10}$/, message: '昵称支持中英文数字组合，1-10位'}]"
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button class="submit" round block type="primary" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
        </van-popup>
        <!-- 添加注册功能end-->
    </div>
</template>

<style scoped>

.van-popup h1{
    padding:  10px;
    margin-bottom: 20px;
}
.login {
    width: 100%;
    height: 100% !important;
    background-color: #fff;
}

.van-nav-bar .img {
    width: 43px;
    height: 43px;
}

.van-nav-bar .img img {
    width: 100%;
}

.van-nav-bar p {
    font-weight: bold;
    height: 46px;
    line-height: 46px;
}

.welcome-title {
    font-size: 30px;
    color: #343230;
    padding: 80px 0px 0px 16px;
}

.welcome-subtitle {
    font-size: 20px;
    color: #9DA0A5;
    padding: 20px 0px 50px 16px;
}

.van-button.submit{
    background-color: #0C34BA;
}
.register{
    margin: 30px 16px;
}
</style>