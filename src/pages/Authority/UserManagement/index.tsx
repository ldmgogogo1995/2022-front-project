/*
 * @Description: 用户管理页面
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-02-09 01:23:10
 * @LastEditors: ldm
 * @LastEditTime: 2022-09-24 02:17:30
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
  Tag,
  Typography,
} from '@arco-design/web-react';
import React, { Suspense, useCallback, useMemo, useState } from 'react';
import locale from './locale';
import SearchForm from './SearchForm';
import styles from './index.module.less';
import { IconPlus } from '@arco-design/web-react/icon';
import { deleteUser, fetchUserList, QueryUserListParams, updateStatus } from './server';
import { C } from '@/constants/common';
import CustomPagination from '@/components/CustomPagination';
import usePageParams, { InitPageParmas } from '@/hooks/usePageParams';
import CustomButton, { ACTION_BTN } from '@/components/CustomButton';
import CreateModal from './CreateModal';
import { useRecoilState } from 'recoil';
import { userIdAtom, visibleAtom } from './model';
import { dateFormat } from '@/utils/dateUtils';
import { SorterResult } from '@arco-design/web-react/es/Table/interface';

const { Text } = Typography;

const UserManagement: React.FC = () => {
  const t = useLocale(locale);
  const c = useLocale();

  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        title: c['table.sequence'],
        dataIndex: 'number',
        render: (...arg) => arg.at(2) + 1,
        width: 60,
        fixed: 'left',
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
        render: (text) => <Text copyable>{text}</Text>,
      },
      {
        title: c['table.createDate'],
        dataIndex: 'createDate',
        sorter: true,
        render: (text) => dateFormat(text),
      },
      {
        title: c['table.updateDate'],
        dataIndex: 'updateDate',
        sorter: true,
        render: (text) => dateFormat(text),
      },
      {
        title: t['user.roles'],
        dataIndex: 'roles',
        ellipsis: true,
        render: (roles) => {
          return (
            <>
              {(roles ?? []).map((role) => (
                <Tag bordered key={role.id}>
                  {role.name}
                </Tag>
              ))}
            </>
          );
        },
      },
      {
        title: t['user.status'],
        dataIndex: 'status',
        render: (status) => {
          return renderUserStatus(status);
        },
      },
      {
        title: c['table.actions'],
        dataIndex: 'actions',
        width: 300,
        fixed: 'right',
        render: (_, record) => {
          const isUse = record.status === 1;
          return (
            <>
              <CustomButton onClick={() => handleEdit(record)} CustomType={ACTION_BTN}>
                {c['actions.edit']}
              </CustomButton>
              <Divider type="vertical" />
              <CustomButton CustomType={ACTION_BTN} onClick={() => handleUpdateStatus(record)}>
                {c[`actions.${isUse ? 'forbidden' : 'use'}`]}
              </CustomButton>
              <Divider type="vertical" />
              <Popconfirm
                title={c['actions.deleteWain']}
                onOk={() => {
                  handelDelete(record.id);
                }}
              >
                <CustomButton CustomType={ACTION_BTN}>{c['actions.delete']}</CustomButton>
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
  const [_, setUserId] = useRecoilState<string>(userIdAtom);
  /*---state---*/
  const [data, setData] = useState([]); // 用户数据
  const [loading, setLoading] = useState<boolean>(false); // loading状态
  const [formParams, setFormParams] = useState<Partial<QueryUserListParams>>({});
  const [total, setTotal] = useState<number>(0);
  const [sorter, setSorter] = useState<SorterResult>({});

  /*---effetc---*/
  useUpdateEffect(() => {
    //关闭弹窗时刷新列表页并且重置用户id
    if (!visible) {
      doSearch(pageParams);
      setUserId('');
    }
  }, [visible]);

  /*---method---*/

  /**
   * @description:渲染用户状态
   * @return {*}
   * @author: ldm
   */
  const renderUserStatus = useCallback((status) => {
    switch (status) {
      case 1:
        return <Tag color="#00b42a">{t['searchForm.isUse']}</Tag>;
      default:
        return <Tag color="#f53f3f">{t['searchForm.isForbidden']}</Tag>;
    }
  }, []);
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
          ...sorter,
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
    [formParams, sorter]
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
    [formParams, sorter]
  );

  /**
   * @description:点击新建按钮
   * @return {*}
   * @author: ldm
   */
  const handleCreateUser = useCallback(() => {
    setVisible(true);
  }, []);

  /**
   * @description:修改用户状态
   * @return {*}
   * @author: ldm
   */
  const handleUpdateStatus = useCallback(async (record) => {
    const id = record.id;
    const status = record.status === 1 ? 0 : 1;
    try {
      const res = await updateStatus({ id, status });
      if (res.code === C.SUCCESS_CODE) {
        doSearch(pageParams);
      } else {
        Message.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  /*--customHook--*/
  const [pageParams, setPageParams] = usePageParams({ current: 1, pageSize: 20 }, doSearch, [
    formParams,
    sorter,
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

  /**
   * @description:点击编辑按钮
   * @return {*}
   * @author: ldm
   */
  const handleEdit = useCallback((record) => {
    setUserId(record.id);
    setVisible(true);
  }, []);

  /**
   * @description:表格排序、筛选
   * @return {*}
   * @author: ldm
   */
  const handleTableChange = useCallback((...arg) => {
    setSorter(arg?.at(1));
  }, []);
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
        <Table
          rowKey="id"
          data={data}
          columns={columns}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 1600 }}
        />
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
        {useMemo(() => visible && <CreateModal />, [visible])}
      </Suspense>
    </Card>
  );
};
export default UserManagement;
