import axios from 'axios'
import config from "@/config";
import _ from './simba'
var instance = axios.create({
    baseURL: config.CONSTANT.BASEURL,
    timeout: 2500
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    _.loadingbar.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    _.loadingbar.finish()
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance