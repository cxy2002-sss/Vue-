//对于axios进行二次封装
import axios from "axios";
// 引入插件
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
//在当前模块中引入store
import store from "@/store";
// done进度条结束，start进度条开始
const requests=axios.create({
    //配置对象
    baseURL:'/api',//发请求的时候自动添加api
    timeout:5000,//请求超时时间
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    //我们添加uuid
    if(store.state.detail.uuid_token){
        //这个字段我们是和后端商量好了的
        config.headers.userTempId=localStorage.getItem('uuid_token');
    }
    //我们在请求头中添加token
    if(store.state.user.token){
        config.headers.token=store.state.user.token;
        localStorage.removeItem('uuid_token')
    }
    // 可以设置进度条
    // start进度条开始
    nprogress.start();
    //congif:配置对象，对象里面有一个属性很重要，header请求头
    return config;
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    // done进度条结束
    nprogress.done();
//成功拦截
    return res.data;
},(error)=>{
    //失败拦截
    return Promise.reject(new Error('faile'))
})

//对外暴露
export default requests;