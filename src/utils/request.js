
import axios from 'axios'
import {getToken, hasToken, removeToken} from "./storage";
import {message} from "antd";
import history from "./history";

const server =  axios.create({
    baseURL:'/api',
    timeout:5000
});

// 添加请求拦截器
server.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(hasToken()){
        //给config添加token
        config.headers.Authorization = `Bearer ${getToken()}`;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    //对token过期进行统一处理
    if(error.response.status === 401){
        //401:表示token过期了
        //1.移除token
        removeToken();
        //2.给提示信息
        message.warning('登录信息过期了');
        //3.跳转到登录页
        /**
         * 在非组件中我们是无法使用Redirect,也无法访问到history对象
         *
         * window.location.href = '/login' 使用这个代码，会让单页面刷新，这样单页面的内容会重新加载，单页面的优势就不存在了。
         * */
        // window.location.href = '/login'
        history.push('/login')
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default server;


