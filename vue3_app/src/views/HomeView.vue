<script>
import Tabbar from "../components/TabbarCom.vue"
import $Axios from "../api/http"
import { onMounted,ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components:{
    Tabbar
  },
  setup() {
    let router = useRouter();

    //轮播图数据请求 
    let bannerLists = ref([]);
    const BannerFun = function(){
      $Axios({
        "url":"/banner",  //路径
        "method":"get", //请求方式 get params post data
      }).then(function(data){
        console.log(data);
        bannerLists.value = data.result;
      })
    } 
    //请求商品数据 -- 热卖推荐数据
    let hotLists = ref([]);
    const typeProductsFun = function(){
      $Axios({
        url:"/typeProducts",  //路径
        method:"get", 
        params:{
          key:'isHot',
          value: 1
        }
      }).then(function(data){
        console.log(data);
        hotLists.value = data.result;
      })
    } 

  let timeText = ref("");
  const getCurrentTime = function(){
    //定义时间段
    //00:06 凌晨 
    //07:10 上午
    //11:14 中午
    //15:18 下午
    //19:23 晚上
    //获取时间
    let date = new Date();
    //获取小时
    let hours = date.getHours();

    if(hours >= 19){
      timeText.value = "晚上好";
    }else if(hours >= 15){
      timeText.value = "下午好";
    }else if(hours >= 11){
      timeText.value = "中午好";
    }else if(hours >= 7){
      timeText.value = "上午好";
    }else{
      timeText.value = "凌晨好";
    }
  }

    //获取信息
    let nickName= ref("");
    const findMyFun = function(){
      $Axios({
        url:'/findMy',
        method:"get"
      }).then(function(data){
        console.log(data);
        nickName.value = data.result[0].nickName
      })
    }


    //请求数据 vue3组合式api 生命周期钩子 页面挂载后钩子
    onMounted(()=>{

      BannerFun();
      typeProductsFun();
      getCurrentTime();
      findMyFun();
    })

    
    //跳转页面
    const goPage =function(url,id){
      router.push({
        path:url,
        query:{
          id
        }
      })
    }
    
    //跳转登陆页面
    const goLogin = function(){
      router.push({
        path:"/login"
      })
    }

    return {
      bannerLists,
      hotLists,
      timeText,
      goPage,
      goLogin,
      nickName
    }

  },
};
</script>



<template>
  <!-- 顶部导航 -->
  <!-- 吸顶效果 -->
  <van-sticky>
    <div class="topNav">
      <van-row>
      </van-row>
    </div>
  </van-sticky>
    <div class="topNav">
      <van-row>
        <van-col span="4">
          <div class ="hello">{{ timeText }}</div>
        </van-col>
        <van-col span="4">
          <div v-if="nickName" class="login">{{ nickName }}</div>
          <div v-else @click="goLogin" class ="login">登陆</div>
        </van-col>
        <van-col span="16">
          <van-search
            shape="round"
            background="#ffffff"
            placeholder="请输入搜索关键词"
            />
        </van-col>
      </van-row>
</div>

  <!-- 轮播图 -->
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerLists" :key="item.pid">
          <img :src="item.bannerImg" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>

<!--  商品列表  -->
<div class="goodslist">
  <van-row>
    <van-col span="12" 
    v-for="item in hotLists" 
    :key="item.id"
    @click="goPage('/detail',item.pid)"
    >
      <div class="item">
        <div class="img">
          <img :src="item.smallImg" alt="">
        </div> 
        <h5>{{item.name}}</h5>
        <h6>{{item.enname}}</h6>
        <p>￥{{item.price}}</p>
        <div class="topTag" v-if="item.isHot">
          <van-tag mark type="danger">热卖</van-tag>
        </div>
      </div>
    </van-col>
  </van-row>
</div>

  
  <!-- 底部导航 -->
  <tabbar :num="0"></tabbar>


</template>

<style scoped>
.topNav{
  background-color: #fff;
}
.topNav .hello{
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.topNav .login{
  height: 44px;
  line-height: 44px;
  text-align: left;
  font-weight: bold;
}
.topNav .van-search{
  padding:5px 10px;
}

.topNav >>> .van-icon-search{
  color:#528CFA;
}

.banner img{
  width: 100%;
}

.goodslist{
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 60px;
}

.goodslist .item{
  margin-right: 10px;
  position: relative;
  margin-bottom: 10px;
}

.goodslist .item .img img{
  width: 100%;
}

.goodslist .item h5{
  color: #444444;
  margin-top: 5px;
}

.goodslist .item h6{
  color: #999999;
}

.goodslist .item p{
  color: #E4393C;
  margin-top: 5px;
  font-weight: bold;
}

.goodslist .topTag{
  position: absolute;
  top:0px;
  right: 0px;
}
</style>