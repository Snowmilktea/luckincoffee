<script>
import Tabbar from "../components/TabbarCom.vue"
import $Axios from "../api/http"
import { onMounted,ref,computed } from "vue";

export default {
  components:{
    Tabbar
  },
  setup() {
    //购物车数据
    let allShopcart =ref([]);
    const findAllshopcart = function(){
      $Axios({
        url:"/findAllShopcart",
        method:"get"
      }).then(function(data){
        console.log(data);
      //计算键选框
      data.result.forEach(function(item){
        item.isCheck = true;
      })
        allShopcart.value = data.result;
      })
    }

    onMounted(()=>{
      findAllshopcart();
    })


    //删除数据
    const del = function(sid){
      $Axios({
        url:"/deleteShopcart",
        method:"post",
        data:{
          sids:JSON.stringify([sid])
        }
      }).then(function(data){
        console.log(data);
        if(data.code == 7000){
          //删除页面数据
          let index = allShopcart.value.findIndex(item=>item.sid == sid);//下标
          allShopcart.value.splice(index,1);
        }
      })
    }

    //请求接口商品数据
    const setCount = function(value,detail){
      //console.log(value,detail;);
      $Axios({
        url:"/modifyShopcartCount",
        method:"post",
        data:{
          sid:detail.name,
          count:value,
        }
      })
    }

    // 全选反选 计算属性
    const allToggle = computed({
      get:()=>{
        return allShopcart.value.every(function(item){
          return item.isCheck;//只要一个为false 为false
          })

      },
      set:(value) =>{
        allShopcart.value.forEach(function(item){
          item.isCheck = value;
        })
      }
    })

    // 计算总价格
    const totalData = computed(()=>{
      var total = 0;
      allShopcart.value.forEach(function(item){
        if(item.isCheck){
          total += item.count * item.price
          }
        })
      return total;
    })

    return{
      allShopcart,
      del,
      setCount,
      allToggle,
      totalData
    }

  },
};
</script>
<template>
      <div class="shopbag">
        <van-nav-bar title="购物袋" fixed/>
        <!-- 顶部背景 -->
        <div class="shopbag_bg"></div>
        <div class="shopbag_lists">

          <div class="shopbag_item" v-for="item in allShopcart" :key="item.sid">
            <van-swipe-cell>
          <!-- 购物袋商品内容 -->
          <div class="item">
              <div class="checkbox">
                  <van-checkbox v-model="item.isCheck"></van-checkbox>
              </div>
              <div class="img">
                <img :src="item.small_img" alt="">
              </div>
              <div class="body">
                <h5>{{ item.name }}<span>{{ item.rule }}</span></h5>
                <h6>{{ item.enname }}</h6>
                <p>{{ item.price }}</p>
              </div>
              <div class="stepper">
                <van-stepper @change="setCount" :name="item.sid" v-model="item.count" theme="round" button-size="22" disable-input />
              </div>
          </div>    
          <!-- 购物袋商品内容 --> 
          <template #right>
            <van-button square text="删除" type="danger" @click="del(item.sid)" class="delete-button" />
          </template>
           </van-swipe-cell>
          </div>
      </div>

  <!-- 底部提交按钮 -->
  <van-submit-bar :price="totalData*100" button-text="提交订单">
    <van-checkbox v-model="allToggle">全选</van-checkbox>
  </van-submit-bar>
  <!-- 底部导航 -->
  <tabbar :num="2"></tabbar>
  </div>
</template>

<style>

.shopbag .shopbag_item .item .img{
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.shopbag .shopbag_item .item .img img{
   width: 100%;
}

.shopbag {
  padding-top: 46px;
  padding-bottom:  120px;
}

.shopbag .shopbag_bg {
  background: url("../assets/img/shopbag_bg.png") no-repeat 0 0;
  background-size: cover;
  height: 60px;
}

.shopbag .shopbag_item {
  background-color: #fff;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
}

.shopbag .shopbag_item .item{
  display: flex;
  padding:10px;
  align-items: center;
  position: relative;
}

.shopbag .shopbag_item .checkbox{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.shopbag .shopbag_item .item .body h5{
  color:#444444;
  margin-top: 5px;
}
.shopbag .shopbag_item .item .body h5 span{
  color:#666666;
}
.shopbag .shopbag_item .item .body h6{
  color:#999999;
  margin-top: 3px;
}

.shopbag .shopbag_item .item .body p{
  color:#E4393C;
  margin-top: 10px;
  font-weight: bold;
}

.shopbag .shopbag_item .item .stepper{
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}

.van-submit-bar{
  bottom: 50px;
}

</style>