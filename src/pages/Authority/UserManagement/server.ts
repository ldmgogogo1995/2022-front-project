/*
 * @Description: 用户管理api定义
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-26 22:14:33
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-31 02:56:40
 */
import { InitPageParmas } from '@/hooks/usePageParams';
import request from '@/utils/request/http';

export interface QueryUserListParams extends InitPageParmas {
  account: string;
  nickname: string;
  status: string;
  startCreateDate: number;
  endCreateDate: number;
}

export const fetchUserList = (params: Partial<QueryUserListParams>): Promise<any> =>
  request.get('/user/list', { ...params });
