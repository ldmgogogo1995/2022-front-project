/*
 * @Description: 用户状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-03-23 00:46:21
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-23 00:52:22
 */
import { atom } from 'recoil';

export type User = {
  user: { account: string; discription: string; id: number; nickname: string; password: string };
  token: string;
};

export const userAtom = atom<User>({
  key: 'user',
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
