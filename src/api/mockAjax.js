//对于axios进行二次封装
import axios from "axios";
// 引入插件
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
// done进度条结束，start进度条开始
const requests=axios.create({
    //配置对象
    baseURL:'/mock',//发请求的时候自动添加mock
    timeout:5000,//请求超时时间
});
//请求拦截器
requests.interceptors.request.use((config)=>{
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