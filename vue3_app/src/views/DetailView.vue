<script>
import { onMounted,ref } from "vue";
import $Axios from "../api/http"
import { useRoute,useRouter } from "vue-router";

import { showToast } from "vant";
import 'vant/es/toast/style';

export default {
    setup(){
        const onClickleft = () => history.back();
        const Route = useRoute();
        const Router = useRouter();

        let detailData = ref(null);
        const productDetailFun = function(){
            console.log(Route.query.id);
            $Axios({
                url:"/productDetail",
                method:'get',
                params:{
                    pid:Route.query.id
                }
            }).then(function(res){
                let data = res.result[0];

                //结构中规则数组
                let rules =['milk','sugar','tem','cream'];
                let rulesData =[];
                rules.forEach(function(v1){
                    if(data[v1] === ""){
                        return;
                    }
                    let rulesItem = {
                        title:data[`${v1}_desc`],
                        activeIndex:0,
                        subRule:[]
                    }
                    let rule = data[v1].split("/");//字符串转数组
                    rule.forEach((v2)=>{
                        rulesItem.subRule.push({title:v2});
                    })
                    rulesData.push(rulesItem);
                })
                data.rulesData = rulesData;
                console.log(data);
                detailData.value = data;
            })
        }


        //按钮切换功能
        const selectBtn = function(index1,index2){
            detailData.value.rulesData[index1].acticeIndex = index2;
        }

        let num = ref(1);

        onMounted(()=>{
            productDetailFun();
            shopcartCount();
        })

        //加入购物袋
        const addShopcart = function(){
            let rule = [];
            detailData.value.rulesData.forEach(function(item){
                rule.push(item.subRule[item.acticeIndex].title);
            })
            // console.log(rule.join("/"));
            $Axios({
                url:"/addShopcart",
                method:"POST",
                data:{
                    pid: Route.query.id,
                    count: num.value,
                    rule: rule.join("/"),
                }
            }).then(function(data){
                console.log(data);
                showToast(data.msg)
                shopcartCount();
            })
        }
        //请求购物袋商品数量
        let cartCount = ref(0);
        const shopcartCount = function(){
            $Axios({
                url:"/shopcartCount",
                method:"get",
            }).then(function(data){
                console.log(data);
                cartCount.value = data.result;
            })
        }

        const goPage = function(){
            Router.push("/shopbag")
        }

        return{
            onClickleft,
            detailData,
            num,
            selectBtn,
            addShopcart,
            goPage,
            cartCount
        };
    },
};

</script>


<template>
    <div class="detail" v-if="detailData">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickleft"
            fixed
        />
        <div class="bg">
            <img :src="detailData.small_img" alt="">
        </div>

        <div class="goods">
            <div class="title">
                <div class="tit">
                    <h5>{{ detailData.name }}</h5>
                    <h6>{{ detailData.enname }}</h6>
                </div>
                <div class="price">
                    ￥{{ detailData.price }}
                </div>
            </div>
            <!-- 按钮 -->
            <div class="button" v-for="(item,index1) in detailData.rulesData" :key="index1">
                <div class="label">{{ item.title }}</div>
                <div class="btns">
                    <span
                        v-for="(value,i) in item.subRule" 
                        :class="{'active':item.acticeIndex == i}"
                        :key="value.title"
                        @click="selectBtn(index1,i)"
                    >       
                        {{ value.title }}               
                    </span>
                </div>
            </div>

            <div class="num">
                <div class="select">
                    选择数量
                </div>
                <div>
                    <van-stepper v-model="num" theme="round" button-size="22" disable-input />
                </div>
            </div>
            <div class="content">
                <div class="text">商品描述</div>
                <div>
                    1.真好喝真好喝真好喝真好喝真好喝真好喝真好喝
                    1.真好喝真好喝真好喝真好喝真好喝真好喝真好喝
                    1.真好喝真好喝真好喝真好喝真好喝真好喝真好喝
                    1.真好喝真好喝真好喝真好喝真好喝真好喝真好喝
                </div>
            </div>
        </div>

    <!-- 底部导航 -->
    <div class="buttonbtn">
        <div class="icon" @click="goPage">
            <van-badge :content="cartCount">
                <van-icon size="25" name="bag-o"/>
            </van-badge>
            <p>购物袋</p>
        </div>
        <div class="icon">
                <van-icon size="25" name="like-o"/>
            <p>已收藏</p>
        </div>
        <div class="btn">
            <van-button type="primary"  @click="addShopcart" round>加入购物车</van-button>
        </div>

    </div>
</div>
</template>

<style>
.detail .bg{
    width: 100%;
    height: 300px;
    overflow: hidden;
}
.detail .bg img{
    width: 100%;
}
.goods{
    position: relative;
    top:-30px;
    margin: 10px;
    padding:10px;
    border-radius: 10px;
    background-color: #fff;
}
.goods .title{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.goods .title .tit{
    flex: 1;
}
.goods .title .tit h5{
    color:#444444;
    font-size: 16px;
}
.goods .title .tit h6{
    color:#999999;
}
.goods .title .price{
    width: 80px;
    color:#E4393C;
    font-size: 16px;
    text-align: right;
    font-weight: bold;
    line-height: 35px;
}
.goods .button{
    display: flex;
    padding-top: 15px;
}
.goods .button .label{
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color:#444444;
}
.goods .button .btns{
    flex: 1;
}
.goods .button .btns span{
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    background-color: #E8E8E8;
    font-size: 14px;
    color:#444444;
    margin-right: 10px;
}
.goods .button .btns span.active{
    background-color: #3762F0;
    color: #fff;
}
.goods .num{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top:1px solid #F5F5F5;
    border-bottom:1px solid #F5F5F5;
    margin: 20px 0px ;
}
.goods .content{
    font-size: 12px;
    color:#666666;
}
.goods .content .text{
    color: #444444;
    font-size: 14px;
    margin-bottom: 10px;
}

.detail .buttonbtn{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
}
.detail .buttonbtn .icon{
    width: 60px;
    display: flex;
    
    flex-direction: column;
    align-items: center;
}
.detail .buttonbtn .btn{
    flex: 1;
    padding-top: 3px;
}
.detail .buttonbtn .btn .van-button{
    width: 100%;
    background-color: #0C34BA;
}

</style>    