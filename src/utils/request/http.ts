/*
 * @Description: 请求库二次封装
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-02 14:20:02
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-20 00:59:12
 */

import axios, { AxiosRequestConfig } from 'axios';
import Qs from 'query-string';
import { Message } from '@arco-design/web-react';
const baseURL = '/api';
import { REQUEST } from '@/constants/common';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
  timeout: REQUEST.TIMEOUT,
  withCredentials: true,
  // transformRequest: (data) => qs.stringify(data),
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    console.log(config, 'request');
    // 携带token
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  (err) => Promise.reject(err)
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (respnose) => {
    // 返回响应主体信息
    return Promise.resolve(respnose);
  },
  (error) => {
    const { respnose } = error;
    if (respnose) {
      // 请求已发送，有返回的情况
      const { status, message } = respnose;
      Message.error(message);
      switch (status) {
        case 401:
          break;
      }
      return Promise.reject(error.respnose);
    } else {
      // 断网处理
      if (!window.navigator.onLine) {
        // 网络断开处理
        return;
      }
      return Promise.reject(error);
    }
  }
);

export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url: string, params: object) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          params: params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post(url: string = '', params: object) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  /**
   * post方法，参数序列化
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  qspost(url: string, params: object) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, Qs.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  /**
   * put方法，对应put请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  put(url: string, params: any) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  /**
   * delete
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  deletefn(url: string, params: AxiosRequestConfig<any>) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};
