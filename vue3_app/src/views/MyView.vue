<script>
import { onMounted,ref } from "vue";
import Tabbar from "../components/TabbarCom.vue"
import $Axios from "../api/http"

export default {
  components:{
    Tabbar
  },
  setup() {
  //获取信息
  let userinfo = ref(null);
  const findMyFun = function(){
    $Axios({
      url:'/findMy',
      method:"get",
    }).then(function(data){
      console.log(data);
      userinfo.value = data.result[0]
    })
  }

  onMounted(() => {
    findMyFun();
  })

  return {
    userinfo
    }
  },
};
</script>
<template>
    <div class="myview" v-if="userinfo">

      <div class="bg">
        <img :src="userinfo.userBg" alt="">
      </div>

      <div class="userinfo">
        <div class="info">
            <div class="img">
              <img :src="userinfo.userImg" alt="">
            </div>
            <div class="name">
                <h6>{{ userinfo.nickName }}</h6>
                <p>{{userinfo.desc?userinfo.desc:'欢迎使用咖啡商城。。。。。'}}</p>
            </div>
        </div>

        <ul>
          <li>个人资料 <van-icon name="arrow" /></li>
          <li>我的订单 <van-icon name="arrow" /></li>
          <li>我的收藏 <van-icon name="arrow" /></li>
          <li>地址管理 <van-icon name="arrow" /></li>
          <li>安全中心 <van-icon name="arrow" /></li>
        </ul>
      </div>

        
      <!-- 底部导航 -->
      <tabbar :num="3"></tabbar>
    </div>
</template>

<style>
.myview .bg{
  height: 150px;
  width: 100%;
  overflow: hidden;
}

.myview .bg img{
  width: 100%;
}

.userinfo{
  margin: 0px 10px;
  padding: 8px 10px;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.5);
  position: relative;
  top:-48px;
}

.userinfo .info{
  display: flex;
  
}

.userinfo .info .img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.userinfo .info .img img{
  width: 100%;
}
.userinfo .info .name h6,.userinfo .info .name p{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.userinfo .info .name h6{
  font-weight: bold;
}

.userinfo .info .name p{
  font-size: 13px;
}

.userinfo ul{
  padding-top:40px;
}
.userinfo ul li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #F0F0F0;
  color:#323233;
}
.userinfo ul li:last-of-type{
  border-bottom: none;
}

</style>