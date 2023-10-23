// 安装axios
// $cnpm i axios -S

import axios from "axios";

// 创建axios 初始化
const service = axios.create({
    baseURL:"http://www.kangliuyong.com:10002",//链接
    timeout:30000,//超时时间
    // headers:{
    //     "Content-Type":"application/x-www-form-urlencoded;charset=utf-8",
    // },
    withCredentials:true //自动获取cookie信息
})


// request 拦截器 发送数据到后台拦截器
service.interceptors.request.use(
    config=>{

        let appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=";
        let token = window.localStorage.getItem("token");
        
        if(config.method == "get"){
            config.params = config.params || {};
            // 添加值
            config.params.appkey = appkey

            if(token){
                config.params.tokenString = token;
            }
            
        }else if(config.method == "post"){

            // 序列化
            let dataParams = "";
            for(let key in config.data){
                dataParams += `${key}=${config.data[key]}&`
            }

            if(token){
                dataParams += `tokenString=${token}&`
            }

            dataParams += `appkey=${appkey}`
            config.data = dataParams
        }

        return config;
    },
    error=>{
        console.log("axios中request报错",error);
        Promise.reject(error);
    }

)
// response 拦截器 后台发送前台拦截器
service.interceptors.response.use(
    config=>{
        return config.data;
    },
    error=>{
        console.log("axios中response报错",error);
        Promise.reject(error);
    }

)

export default service;