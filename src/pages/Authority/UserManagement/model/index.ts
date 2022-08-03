/*
 * @Description: 存放部分全局状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-01 01:57:37
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-03 01:17:14
 */

import { Message } from '@arco-design/web-react';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { fetchUserDetail } from '../server';

// userId 原子
export const userIdAtom = atom<string>({
  key: 'UserId',
  default: '',
});

// 新增编辑框visible
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
      get(userInfoQueryRequestIDState(userID)); // 添加请求ID作为依赖关系
      if (!userID) return {};
      const res = await fetchUserDetail(userID);
      if (res.code === 10000) {
        return res.data;
      } else {
        Message.error(res.message);
        return {};
      }
    },
});
