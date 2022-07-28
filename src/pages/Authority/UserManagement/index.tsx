/*
 * @Description: 用户管理页面
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-09 01:23:10
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-29 02:17:14
 */
import { userSelector } from '@/globalAtoms/userAtoms';
import { useLocale } from '@/hooks';
import {
  Card,
  Button,
  Space,
  Table,
  Pagination,
  TableColumnProps,
  Message,
  Divider,
} from '@arco-design/web-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import locale from './locale';
import SearchForm from './SearchForm';
import styles from './index.module.less';
import { IconPlus } from '@arco-design/web-react/icon';
import { fetchUserList, QueryUserListParams } from './server';
import { C } from '@/constants/common';
import CustomPagination from '@/components/CustomPagination';
import usePageParams, { InitPageParmas } from '@/hooks/usePageParams';
import CustomButton from '@/components/CustomButton';

const UserManagement: React.FC = () => {
  const user = useRecoilValue(userSelector);
  const t = useLocale(locale);
  const c = useLocale();
  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        title: c['table.sequence'],
        dataIndex: 'number',
        render: (...arg) => arg.at(2) + 1,
      },
      {
        title: t['user.nickname'],
        dataIndex: 'nickname',
        ellipsis: true,
      },
      {
        title: t['user.account'],
        dataIndex: 'account',
        ellipsis: true,
      },
      {
        title: t['user.createDate'],
        dataIndex: 'createDate',
        sorter: true,
      },
      {
        title: t['user.roles'],
        dataIndex: 'roles',
        ellipsis: true,
      },
      {
        title: c['table.actions'],
        dataIndex: 'actions',
        render: (_, record) => {
          return (
            <>
              <CustomButton CustomType="ACTION_BTN">{c['actions.edit']}</CustomButton>
              <Divider type="vertical" />
              <CustomButton CustomType="ACTION_BTN">{c['actions.delete']}</CustomButton>
            </>
          );
        },
      },
    ],
    [t]
  );

  /*---state---*/
  const [data, setData] = useState([]); // 用户数据
  const [loading, setLoading] = useState<boolean>(false); // loading状态
  const [formParams, setFormParams] = useState<Partial<QueryUserListParams>>({});

  /*---method---*/
  /**
   * @description:获取用户列表
   * @return {*}
   * @author: ldm
   */
  const getUserList = useCallback(async (pageParams) => {
    setLoading(true);
    try {
      const params = {
        ...pageParams,
      };
      const res = await fetchUserList(params).finally(() => setLoading(false));
      if (res.code === C.SUCCESS_CODE) {
        setData(res.data ?? []);
      } else {
        Message.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  /**
   * @description:刷新列表数据
   * @return {*}
   * @author: ldm
   */
  const doSerach = useCallback((pageParams: InitPageParmas) => {
    getUserList(pageParams);
  }, []);
  /*--customHook--*/
  const [pageParams, setPageParams] = usePageParams({ current: 1, pageSize: 20 }, doSerach);

  return (
    <Card
      title={t['menu.userManagement.searchTable']}
      headerStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
    >
      <SearchForm setFormParams={setFormParams} />
      <div className={styles['button-group']}>
        <Space>
          <Button type="primary" icon={<IconPlus />}>
            {t['action.button.create']}
          </Button>
        </Space>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Table rowKey="id" data={data} columns={columns} pagination={false} loading={loading} />
      </div>
      <CustomPagination
        pageSize={pageParams.pageSize}
        current={pageParams.current}
        showTotal
        total={200}
        showJumper
        sizeCanChange
        onChange={(current, pageSize) => {
          setPageParams({ current, pageSize });
        }}
        onPageSizeChange={(pageSize, current) => {
          setPageParams({ current, pageSize });
        }}
      />
    </Card>
  );
};
export default UserManagement;
