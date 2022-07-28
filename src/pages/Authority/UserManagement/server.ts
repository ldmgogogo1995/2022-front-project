/*
 * @Description: 用户管理api定义
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-26 22:14:33
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-29 02:19:34
 */
import { InitPageParmas } from '@/hooks/usePageParams';
import request from '@/utils/request/http';

export interface QueryUserListParams extends InitPageParmas {
  account: string;
  nickname: string;
  status: string;
  createDate: string;
}

export const fetchUserList = (params: Partial<QueryUserListParams>): Promise<any> =>
  request.get('/user/list', { ...params });
