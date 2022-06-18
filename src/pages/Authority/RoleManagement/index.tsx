/*
 * @Description:角色管理
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-03-21 22:23:57
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-24 01:11:52
 */

import { User, userAtom } from '@/globalAtoms/userAtoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

const RoleManagement: React.FC = () => {
  const user = useRecoilValue<User>(userAtom);
  console.log(user, 'user');
  return <div>RoleManagement</div>;
};
export default RoleManagement;
