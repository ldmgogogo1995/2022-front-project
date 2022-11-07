/*
 * @Description: 角色管理api定义
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-26 22:14:33
 * @LastEditors: ldm
 * @LastEditTime: 2022-09-29 01:46:48
 */
import { FetchListParamsType } from '@/index';
import { InitPageParmas } from '@/hooks/usePageParams';
import request from '@/utils/request/http';

export interface QueryRoleListParams extends FetchListParamsType {
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

export interface CreateRoleParams {
  account: string;
  nickname: string;
  password: string;
  sex: string;
  age: number;
  email: string;
  phone: number;
  roles: Role[];
}

export interface EditRoleParams extends CreateRoleParams {
  id: string;
}

/**
 * @description: 获取角色列表
 * @param {Partial} params
 * @return {*}
 * @author: ldm
 */

export const fetchRolePageList = (params: Partial<QueryRoleListParams>): Promise<any> =>
  request.get('/role/page', { ...params });

/**
 * @description: 获取角色详情
 * @return {*}
 * @author: ldm
 */

export const fetchRoleDetail = (id: string): Promise<any> => request.get('/role/detail', { id });

/**
 * @description:编辑角色
 * @return {*}
 * @author: ldm
 */
export const editRole = (data: EditRoleParams): Promise<any> =>
  request.put('/role/edit', { ...data });

/**
 * @description:新建角色
 * @return {*}
 * @author: ldm
 */
export const createRole = (data: CreateRoleParams): Promise<any> =>
  request.post('/role/create', { ...data });

/**
 * @description: 获取角色列表
 * @return {*}
 * @author: ldm
 */
export const fetchRoleList = (): Promise<any> => request.get('/role/list');

/**
 * @description: 删除角色
 * @return {*}
 * @author: ldm
 */
export const deleteRole = (ids: string[]): Promise<any> =>
  request.deletefn('/role/delete', { data: ids });
