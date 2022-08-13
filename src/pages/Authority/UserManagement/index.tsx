/*
 * @Description: 用户管理页面
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-09 01:23:10
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-14 04:29:18
 */
import { useLocale, useUpdateEffect } from '@/hooks';
import {
  Card,
  Button,
  Space,
  Table,
  TableColumnProps,
  Message,
  Divider,
  Spin,
  Popconfirm,
} from '@arco-design/web-react';
import React, { Suspense, useCallback, useMemo, useState } from 'react';
import locale from './locale';
import SearchForm from './SearchForm';
import styles from './index.module.less';
import { IconPlus } from '@arco-design/web-react/icon';
import { deleteUser, fetchUserList, QueryUserListParams } from './server';
import { C } from '@/constants/common';
import CustomPagination from '@/components/CustomPagination';
import usePageParams, { InitPageParmas } from '@/hooks/usePageParams';
import CustomButton from '@/components/CustomButton';
import CreateModal from './CreateModal';
import { useRecoilState } from 'recoil';
import { visibleAtom } from './model';
import { dateFormat } from '@/utils/dateUtils';

const UserManagement: React.FC = () => {
  const t = useLocale(locale);
  const c = useLocale();

  const columns: TableColumnProps<{ id: string }>[] = useMemo(
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
        render: (text) => dateFormat(text),
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
              <Popconfirm
                title={c['actions.deleteWain']}
                onOk={() => {
                  handelDelete(record.id);
                }}
              >
                <CustomButton CustomType="ACTION_BTN">{c['actions.delete']}</CustomButton>
              </Popconfirm>
            </>
          );
        },
      },
    ],
    [t]
  );

  /*---recoil---*/
  const [visible, setVisible] = useRecoilState<boolean>(visibleAtom);
  /*---state---*/
  const [data, setData] = useState([]); // 用户数据
  const [loading, setLoading] = useState<boolean>(false); // loading状态
  const [formParams, setFormParams] = useState<Partial<QueryUserListParams>>({});
  const [total, setTotal] = useState<number>(0);

  /*---effetc---*/
  useUpdateEffect(() => {
    //关闭弹窗时刷新列表页
    if (!visible) {
      doSearch(pageParams);
    }
  }, [visible]);

  /*---method---*/

  /**
   * @description:获取用户列表
   * @return {*}
   * @author: ldm
   */
  const getUserList = useCallback(
    async (pageParams) => {
      setLoading(true);
      try {
        const params = {
          ...pageParams,
          ...formParams,
        };
        const res = await fetchUserList(params).finally(() => setLoading(false));
        if (res.code === C.SUCCESS_CODE) {
          setData(res.data ?? []);
          setTotal(res.total ?? 0);
        } else {
          Message.error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [formParams]
  );

  /**
   * @description:刷新列表数据
   * @return {*}
   * @author: ldm
   */
  const doSearch = useCallback(
    (pageParams: InitPageParmas) => {
      getUserList(pageParams);
    },
    [formParams]
  );

  /**
   * @description:点击新建按钮
   * @return {*}
   * @author: ldm
   */
  const handleCreateUser = useCallback(() => {
    setVisible(true);
  }, []);
  /*--customHook--*/
  const [pageParams, setPageParams] = usePageParams({ current: 1, pageSize: 20 }, doSearch, [
    formParams,
  ]);
  /**
   * @description: 删除用户
   * @return {*}
   * @author: ldm
   */
  const handelDelete = useCallback(
    async (id) => {
      try {
        const res = await deleteUser([id]);
        if (res.code === C.SUCCESS_CODE) {
          Message.success(c['actions.success']);
          doSearch(pageParams);
        } else {
          Message.error(res.message);
        }
      } catch (error) {}
    },
    [pageParams]
  );

  return (
    <Card
      title={t['menu.userManagement.searchTable']}
      headerStyle={{ border: 'none', height: 'auto', paddingTop: '20px' }}
    >
      <SearchForm setFormParams={setFormParams} />
      <div className={styles['button-group']}>
        <Space>
          <Button type="primary" onClick={handleCreateUser} icon={<IconPlus />}>
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
        total={total}
        showJumper
        sizeCanChange
        onChange={(current, pageSize) => {
          setPageParams({ current, pageSize });
        }}
        onPageSizeChange={(pageSize, current) => {
          setPageParams({ current, pageSize });
        }}
      />
      <Suspense fallback={<Spin loading={true} />}>
        <CreateModal />
      </Suspense>
    </Card>
  );
};
export default UserManagement;
