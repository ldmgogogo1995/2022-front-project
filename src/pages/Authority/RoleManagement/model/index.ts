/*
 * @Description: 存放部分全局状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-01 01:57:37
 * @LastEditors: ldm
 * @LastEditTime: 2022-11-17 00:01:02
 */

import { C } from '@/constants/common';
import { Message } from '@arco-design/web-react';
import { atom, atomFamily, selector, selectorFamily, useSetRecoilState } from 'recoil';
import { fetchRoleList, fetchRoleDetail } from '../server';

export const roleIdAtom = atom<string>({
  key: 'RoleId',
  default: '',
});

export const visibleAtom = atom<boolean>({
  key: 'RoleCreateModalVisible',
  default: false,
});
export const roleInfoQueryRequestIDState = atomFamily({
  key: 'RoleInfoQueryRequestID',
  default: '',
});
export const roleInfoQuery = selectorFamily({
  key: 'RoleInfoQuery',
  get:
    (roleID: string) =>
    async ({ get }) => {
      try {
        const visible = get(visibleAtom);
        get(roleInfoQueryRequestIDState(roleID));
        if (!visible || !roleID) return {};
        const res = await fetchRoleDetail(roleID);
        if (res.code === C.SUCCESS_CODE) {
          return res.data;
        } else {
          Message.error(res.message);
          return {};
        }
      } catch (error) {
        console.error(error);
      }
    },
});

// 角色列表selector
export const roleListQuery = selector({
  key: 'roleListQuery',
  get: async () => {
    try {
      const res = await fetchRoleList();
      if (res.code === C.SUCCESS_CODE) {
        return res.data;
      } else {
        Message.error(res.message);
        return [];
      }
    } catch (error) {}
  },
});

/**
 * @description:刷新角色信息
 * @return {*}
 * @author: ldm
 */
export function useRefreshRoleInfo(roleID: string): any {
  const setRoleInfoQueryRequestID = useSetRecoilState(roleInfoQueryRequestIDState(roleID));
  return () => {
    setRoleInfoQueryRequestID(roleID);
  };
}
