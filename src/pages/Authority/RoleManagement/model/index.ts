/*
 * @Description: 存放部分全局状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-01 01:57:37
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-28 06:05:06
 */

import { C } from '@/constants/common';
import { Message } from '@arco-design/web-react';
import { atom, atomFamily, selector, selectorFamily, useSetRecoilState } from 'recoil';
import { fetchRoleList, fetchUserDetail } from '../server';

export const userIdAtom = atom<string>({
  key: 'UserId',
  default: '',
});

export const visibleAtom = atom<boolean>({
  key: 'UserCreateModalVisible',
  default: false,
});
export const userInfoQueryRequestIDState = atomFamily({
  key: 'UserInfoQueryRequestID',
  default: '',
});
export const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get:
    (userID: string) =>
    async ({ get }) => {
      try {
        const visible = get(visibleAtom);
        get(userInfoQueryRequestIDState(userID));
        if (!visible || !userID) return {};
        const res = await fetchUserDetail(userID);
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
export function useRefreshUserInfo(userID: string) {
  const setUserInfoQueryRequestID = useSetRecoilState(userInfoQueryRequestIDState(userID));
  return () => {
    setUserInfoQueryRequestID(userID);
  };
}
