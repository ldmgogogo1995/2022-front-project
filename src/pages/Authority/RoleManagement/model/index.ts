/*
 * @Description: 存放部分全局状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-01 01:57:37
 * @LastEditors: ldm
 * @LastEditTime: 2022-09-29 01:50:36
 */

import { C } from '@/constants/common';
import { Message } from '@arco-design/web-react';
import { atom, atomFamily, selector, selectorFamily, useSetRecoilState } from 'recoil';
import { fetchRoleList, fetchRoleDetail } from '../server';

export const userIdAtom = atom<string>({
  key: 'RoleId',
  default: '',
});

export const visibleAtom = atom<boolean>({
  key: 'RoleCreateModalVisible',
  default: false,
});
export const userInfoQueryRequestIDState = atomFamily({
  key: 'RoleInfoQueryRequestID',
  default: '',
});
export const userInfoQuery = selectorFamily({
  key: 'RoleInfoQuery',
  get:
    (userID: string) =>
    async ({ get }) => {
      try {
        const visible = get(visibleAtom);
        get(userInfoQueryRequestIDState(userID));
        if (!visible || !userID) return {};
        const res = await fetchRoleDetail(userID);
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
 * @description:刷新用户信息
 * @return {*}
 * @author: ldm
 */
export function useRefreshRoleInfo(userID: string) {
  const setRoleInfoQueryRequestID = useSetRecoilState(userInfoQueryRequestIDState(userID));
  return () => {
    setRoleInfoQueryRequestID(userID);
  };
}
