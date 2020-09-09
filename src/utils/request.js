import qs from 'qs';
import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : 'http://47.104.211.178:9187/api/';

// 创建一个 axios 实例
const service = axios.create({
  baseURL,
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest(data, config) {
    if (config['Content-Type'] === 'application/x-www-form-urlencoded') {
      return qs.stringify(data);
    } else if (config['Content-Type'] === 'application/json;charset=UTF-8') {
      return JSON.stringify({
        ...data,
        token: sessionStorage.getItem('token')
      });
    } else {
      return data;
    }
  }
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
