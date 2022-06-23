// 导入包
import { $http } from '@escook/request-miniprogram';


// 配置根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net';


// 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
     title: '数据加载中....、..',
   });
}

// 请求完成后
$http.afterRequest = function () {
   uni.hideLoading();
}


// 将https挂载到全局uni对象中
uni.$http = $http;