/*
 * @Description: 用户新增/编辑弹窗
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-31 19:25:19
 * @LastEditors: ldm
 * @LastEditTime: 2022-11-07 23:49:38
 */

import locale from '../locale';
import { Form, Input, InputNumber, Message, Modal, Radio, Select } from '@arco-design/web-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  roleListQuery,
  useRefreshUserInfo,
  userIdAtom,
  userInfoQuery,
  visibleAtom,
} from '../model';
import { useLocale, useUpdateEffect } from '@/hooks';
import { createUser, CreateUserParams, editUser, EditUserParams } from '../server';
import { C } from '@/constants/common';
import { INPUT } from '@/constants/component';
const initialValues: Partial<CreateUserParams> = {
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
  const userInfo = useRecoilValue<Partial<EditUserParams>>(userInfoQuery(userId)); // 用户信息
  const roleList = useRecoilValue(roleListQuery);
  const [visible, setVisible] = useRecoilState(visibleAtom);
  const refreshUserInfo = useRefreshUserInfo(userId);

  /*--memo--*/
  const title = useMemo(
    () => (userId ? t['user.modal.editTitle'] : t['user.modal.createTitle']),
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
      refreshUserInfo();
    } else {
      form.resetFields();
    }
  }, [visible]);

  //根据用户信息更新表单值
  useEffect(() => {
    const roleData = { ...userInfo, roles: (userInfo.roles ?? []).map((role) => role.id) };
    form.setFieldsValue(roleData);
  }, [userInfo]);

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
          res = await editUser({ ...values, id: userId }).finally(() => {
            setLoading(false);
          });
        } else {
          res = await createUser(values).finally(() => {
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
          label={t['user.modal.nickname']}
          field="nickname"
          rules={[{ required: true, message: t['user.modal.nicknamePlaceholder'] }]}
        >
          <Input placeholder={t['user.modal.nicknamePlaceholder']} max={INPUT.MAX} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.account']}
          field="account"
          rules={[{ required: true, message: t['user.modal.accountPlaceholder'] }]}
          disabled={!!userId}
        >
          <Input placeholder={t['user.modal.accountPlaceholder']} max={INPUT.MAX} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.password']}
          field="password"
          rules={[{ required: true, message: t['user.modal.passwordPlaceholder'] }]}
        >
          <Input placeholder={t['user.modal.passwordPlaceholder']} max={INPUT.MAX} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.sex']}
          field="sex"
          rules={[{ required: true, message: t['user.modal.sex'] }]}
        >
          <Radio.Group
            options={[
              {
                label: t['user.modal.man'],
                value: 'man',
              },
              {
                label: t['user.modal.woman'],
                value: 'woman',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={t['user.modal.age']}
          field="age"
          rules={[{ required: true, message: t['user.modal.agePlaceholder'] }]}
        >
          <InputNumber placeholder={t['user.modal.agePlaceholder']} max={99} min={18} />
        </Form.Item>
        <Form.Item label={t['user.modal.email']} field="email">
          <Input placeholder={t['user.modal.emailPlaceholder']} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.phone']}
          field="phone"
          rules={[{ required: true, message: t['user.modal.rightPhone'] }]}
        >
          <InputNumber hideControl placeholder={t['user.modal.phonePlaceholder']} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.bindRoles']}
          field="roles"
          rules={[{ required: true, message: t['user.modal.bindRolesPlease'] }]}
        >
          <Select
            placeholder={t['user.modal.bindRolesPlease']}
            mode="multiple"
            allowClear
            options={roleOptions}
          />
        </Form.Item>
        <Form.Item label={t['user.modal.description']} field="description">
          <Input.TextArea
            placeholder={t['user.modal.descriptionPlaceholder']}
            allowClear
            showWordLimit
            maxLength={INPUT.TEXTAREA.MAXLENGTH}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateModal;
