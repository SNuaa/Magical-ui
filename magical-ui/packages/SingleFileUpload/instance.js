import Qs from 'qs';
import axios from 'axios'
const instance = axios.create()
// instance.defaults.baseURL = 'http://127.0.0.1:3000'
instance.defaults.headers['Content-Type'] = 'multipart/form-data'
instance.defaults.transformRequest = (data, headers) => {
    const contentType = headers['Content-Type']
    if (contentType === 'application/x-www-form-urlencoded') {
        //用于处理 URL 参数的序列化和反序列化。
        //它可以帮助将 JavaScript 对象转换为 URL 查询字符串，
        //以便于发送请求或解析查询参数。
        return Qs.stringify(data)
    }
    return data
}

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 相应拦截器(每一个请求响应之前,将最新的token保存到浏览器混村中)
instance.interceptors.response.use(function (response) {
    console.log('拦截器起作用!');
    //解构出来
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    const { status } = error.response?.status || {};
    if (status === 401) {// 判断状态码(401为token过期,清除token返回登录页面)
        localStorage.removeItem("token")
        window.location.href = "#/login"
    }
    return Promise.reject(error);
});

export default instance