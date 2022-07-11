// 对axios进行二次封装
import axios from 'axios'; 
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"
// 利用axios对象的方法create，创建一个axios实例，requests就是axios,只不过稍微配置一下
const requests = axios.create({
    baseURL:"/mock",
    timeout:5000,
});

// 请求拦截器，在发请求前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // 进度条开始动
    nprogress.start();
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done();
    // 成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(error)=>{ 
    // 响应失败的回调函数
    return Promise.reject(error)
});

// 对外暴露
export default requests;

