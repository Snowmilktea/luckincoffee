<script>
import Tabbar from "../components/TabbarCom.vue"
import { onMounted, ref } from 'vue';
import $Axios from "../api/http"
export default {
  components:{
    Tabbar
  },
  setup() {
    const active = ref(0);
    
    //请求左侧数据
    let leftButton = ref([]);
    const leftList = function(){

      $Axios({
        url:"/type",
        method:"get"
      }).then(function(data){
        data.result.unshift({type:"isHot",typeDesc:"热卖推荐"})
        console.log(data);
        leftButton.value = data.result;
      })
    }
    
    //请求右侧商品列表
    let goodslist = ref([]);
    const rightList = function(){

      let { type } = leftButton.value[active.value] || {type:"isHot",typeDesc:"热卖推荐"};
      $Axios({
        url:"/typeProducts",
        method:"get",
        params:{
          key: type == "isHot" ? "isHot":"type",
          value: type == "isHot" ? 1:type
        }
      }).then(function(data){
        console.log(data);
        goodslist.value = data.result;
      })
    }
    //页面执行完毕后调用
    onMounted(()=>{
      leftList();
      rightList();
    })

    //左侧按钮切换效果，实现右侧数据更新
    const setIndex = function(index){
      active.value = index;//修改下标
      console.log("调用方法");
    //重新加载数据
    rightList(); 
    }
    
  
    return { 
      active,
      leftButton,
      goodslist,
      setIndex
     };
  },
};
</script>
<template>
    <div>
        <van-search
          shape="round"
          background="#ffffff"
          placeholder="请输入搜索关键词"
        />
        
        <div class="menuContent">
          <div class="leftList">
            <van-sidebar v-model="active" @change="setIndex">
              <van-sidebar-item 
              v-for="item in leftButton"
              :key="item.type"
              :title="item.typeDesc" 
              />
            </van-sidebar>
          </div>
          <div class="rightList">
            <!--  商品列表  -->
              <div class="goodslist">
                <van-row>
                  <van-col span="12" v-for="item in goodslist" :key="item.id">
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
          </div>
        </div>
        <!-- 底部导航 -->
        <tabbar :num="1"></tabbar>
    </div>
</template>
<style>
.menuContent{
  position: fixed;
  top:54px;
  bottom: 50px;
  width: 100%;
  display: flex;
}

.menuContent .leftList{
  width: 80px;
}

.menuContent .leftList .van-sidebar-item--select:before{
  width: 3px;
  height: 30px;
}

.menuContent .rightList{
  flex:1;
  background-color: #fff;
  overflow-y: auto;
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