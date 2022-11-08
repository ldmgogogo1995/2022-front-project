/*
 * @Description: 用户新增/编辑弹窗
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-31 19:25:19
 * @LastEditors: ldm
 * @LastEditTime: 2022-11-09 00:29:58
 */

import locale from '../locale';
import { Form, Input, Message, Modal, Radio, Select } from '@arco-design/web-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  roleListQuery,
  useRefreshRoleInfo,
  userIdAtom,
  userInfoQuery,
  visibleAtom,
} from '../model';
import { useLocale, useUpdateEffect } from '@/hooks';
import { createRole, CreateRoleParams, editRole, EditRoleParams } from '../server';
import { C } from '@/constants/common';
import { INPUT } from '@/constants/component';
const initialValues: Partial<CreateRoleParams> = {
  sex: 'man',
  age: 18,
};

const { useForm } = Form;
interface IProps {}

const CreateModal: React.FC<IProps> = () => {
  const [form] = useForm();
  const t = useLocale(locale);
  const c = useLocale();

  /*--recoil--*/
  const userId = useRecoilValue(userIdAtom); //用户id
  const userInfo = useRecoilValue<Partial<EditRoleParams>>(userInfoQuery(userId)); // 用户信息
  const roleList = useRecoilValue(roleListQuery);
  const [visible, setVisible] = useRecoilState(visibleAtom);
  const refreshRoleInfo = useRefreshRoleInfo(userId);

  /*--memo--*/
  const title = useMemo(
    () => (userId ? t['role.modal.editTitle'] : t['role.modal.createTitle']),
    [t, userId]
  );

  const roleOptions = useMemo(
    () =>
      (roleList ?? []).map((role) => ({
        label: role.name,
        value: role.id,
      })),
    [roleList]
  );
  /*--state--*/

  const [loading, setLoading] = useState<boolean>(false);

  /*--effect--*/
  // 刷新用户信息
  useEffect(() => {
    if (visible && userId) {
      refreshRoleInfo();
    } else {
      form.resetFields();
    }
  }, [visible]);

  /*--method--*/
  /**
   * @description:点击取消按钮
   * @param {*} useCallback
   * @return {*}
   * @author: ldm
   */
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);
  /**
   * @description: 提交表单
   * @return {*}
   * @author: ldm
   */
  const handleSubmit = useCallback(() => {
    form.validate().then(async (values) => {
      try {
        let res;
        setLoading(true);
        if (userId) {
          res = await editRole({ ...values, id: userId }).finally(() => {
            setLoading(false);
          });
        } else {
          res = await createRole(values).finally(() => {
            setLoading(false);
          });
        }
        if (res?.code === C.SUCCESS_CODE) {
          Message.success(c['actions.success']);
          setVisible(false);
        } else {
          Message.error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, [userId]);
  return (
    <Modal
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      visible={visible}
      title={title}
      unmountOnExit
      mountOnEnter={false}
    >
      <Form form={form} initialValues={initialValues}>
        <Form.Item
          label={t['role.modal.name']}
          field="name"
          rules={[{ required: true, message: t['role.modal.namePlaceholder'] }]}
        >
          <Input placeholder={t['role.modal.namePlaceholder']} max={INPUT.MAX} allowClear />
        </Form.Item>
        <Form.Item
          label={t['role.modal.description']}
          field="description"
          rules={[{ required: true, message: t['role.modal.descriptionPlaceholder'] }]}
        >
          <Input.TextArea
            placeholder={t['role.modal.descriptionPlaceholder']}
            showWordLimit
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateModal;
