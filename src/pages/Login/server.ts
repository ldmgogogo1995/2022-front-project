/*
 * @Description: loginApi
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-23 00:44:22
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-14 04:11:22
 */

import request from '@/utils/request/http';
export type LoginParams = {
  username: string;
  password: string;
};
export const login = (data: LoginParams): Promise<any> =>
  request.post('/common/login', { ...data });
