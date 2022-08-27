/*
 * @Description: 用户管理api定义
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-26 22:14:33
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-28 05:01:42
 */
import { FetchListParamsType } from '@/index';
import { InitPageParmas } from '@/hooks/usePageParams';
import request from '@/utils/request/http';

export interface QueryUserListParams extends FetchListParamsType {
  account: string;
  nickname: string;
  status: string;
  startCreateDate: number;
  endCreateDate: number;
}

export interface Role {
  name: string;
  id: string;
}

export interface CreateUserParams {
  account: string;
  nickname: string;
  password: string;
  sex: string;
  age: number;
  email: string;
  phone: number;
  roles: Role[];
}

export interface EditUserParams extends CreateUserParams {
  id: string;
}

/**
 * @description: 获取用户列表
 * @param {Partial} params
 * @return {*}
 * @author: ldm
 */

export const fetchUserList = (params: Partial<QueryUserListParams>): Promise<any> =>
  request.get('/user/list', { ...params });

/**
 * @description: 获取用户详情
 * @return {*}
 * @author: ldm
 */

export const fetchUserDetail = (id: string): Promise<any> => request.get('/user/detail', { id });

/**
 * @description:编辑用户
 * @return {*}
 * @author: ldm
 */
export const editUser = (data: EditUserParams): Promise<any> =>
  request.put('/user/edit', { ...data });

/**
 * @description:新建用户
 * @return {*}
 * @author: ldm
 */
export const createUser = (data: CreateUserParams): Promise<any> =>
  request.post('/user/create', { ...data });

/**
 * @description: 获取角色列表
 * @return {*}
 * @author: ldm
 */
export const fetchRoleList = (): Promise<any> => request.get('/role/list');

/**
 * @description: 删除用户
 * @return {*}
 * @author: ldm
 */
export const deleteUser = (ids: string[]): Promise<any> =>
  request.deletefn('/user/delete', { data: ids });
