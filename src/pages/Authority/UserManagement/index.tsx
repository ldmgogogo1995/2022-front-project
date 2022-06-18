/*
 * @Description: 用户管理页面
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-09 01:23:10
 * @LastEditors: ldm
 * @LastEditTime: 2022-04-01 01:04:34
 */
import { useLocale } from '@/hooks';
import { Card } from '@arco-design/web-react';
import React from 'react';
import locale from './locale';
import SearchForm from './SearchForm';
const UserManagement: React.FC = () => {
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
