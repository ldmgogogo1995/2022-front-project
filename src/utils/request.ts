/**
 * 请求库封装
 */
import axios from 'axios';
const baseURL = '127.0.0.1';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use((config) => {
  console.log(config, 'request');
  return config
});

/**
 * 响应拦截器
 */
instance.interceptors.response.use((config) => {
  console.log(config, 'respnose');
});
export default instance;
