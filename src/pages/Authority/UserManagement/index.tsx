/*
 * @Description: 用户管理页面
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-09 01:23:10
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-20 00:53:30
 */
import { userAtom } from '@/globalAtoms/userAtoms';
import { useLocale } from '@/hooks';
import { Card } from '@arco-design/web-react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import locale from './locale';
import SearchForm from './SearchForm';
const UserManagement: React.FC = () => {
  const user = useRecoilValue(userAtom)
  console.log(user,'user')
  const t = useLocale(locale);
  return (
    <Card
      title={t['menu.userManagement.searchTable']}
      headerStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
    >
      <SearchForm />
    </Card>
  );
};
export default UserManagement;
