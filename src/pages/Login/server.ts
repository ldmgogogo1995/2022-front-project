/*
 * @Description: loginApi
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-23 00:44:22
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-24 01:56:31
 */

import request from '@/utils/request/http';
export type LoginParams = {
  username: string;
  password: string;
};
export const login = (data: LoginParams): Promise<any> =>
  request.qspost('/common/login', { ...data });
