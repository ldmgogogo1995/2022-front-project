/*
 * @Description:角色管理
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-03-21 22:23:57
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-01 02:34:46
 */

import { User, userAtom } from '@/globalAtoms/userAtoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

const RoleManagement: React.FC = () => {
  const user = useRecoilValue<User>(userAtom);
  return <div>RoleManagement</div>;
};
export default RoleManagement;
