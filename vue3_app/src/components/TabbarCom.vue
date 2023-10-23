<script>

import { ref } from 'vue';

export default {
    props:['num'],
  setup(props) {
    const active = ref(props.num);
    return { active };
  },
};
</script>

<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="orders-o" to="/menu">菜单</van-tabbar-item>
            <van-tabbar-item icon="bag-o" to="/shopbag">购物袋</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>