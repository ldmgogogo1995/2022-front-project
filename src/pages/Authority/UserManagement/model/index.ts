/*
 * @Description: 存放部分全局状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-01 01:57:37
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-05 19:29:14
 */

import { C } from '@/constants/common';
import { Message } from '@arco-design/web-react';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
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
        get(userInfoQueryRequestIDState(userID)); // 添加请求ID作为依赖关系
        if (!userID) return {};
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
