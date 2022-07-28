/*
 * @Description: 用户状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-03-23 00:46:21
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-21 01:13:58
 */
import { atom, selector } from 'recoil';

export type User = {
  user: { account: string; discription: string; id: number; nickname: string; password: string };
  token: string;
};
//
export const userAtom = atom<User>({
  key: 'userAtom',
  default: {
    user: {
      account: '',
      discription: '',
      id: 1,
      nickname: '',
      password: '',
    },
    token: '',
  },
});

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const userInfo = localStorage.getItem('USER_INFO')
      ? JSON.parse(localStorage.getItem('USER_INFO'))
      : get(userAtom);
    return userInfo;
  },
});
