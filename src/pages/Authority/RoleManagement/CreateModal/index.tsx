/*
 * @Description: 用户新增/编辑弹窗
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-31 19:25:19
 * @LastEditors: ldm
 * @LastEditTime: 2022-11-16 23:55:41
 */

import locale from '../locale';
import { Form, Input, Message, Modal, Radio, Select } from '@arco-design/web-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRefreshRoleInfo, roleIdAtom, roleInfoQuery, visibleAtom } from '../model';
import { useLocale, useUpdateEffect } from '@/hooks';
import { createRole, CreateRoleParams, editRole, EditRoleParams } from '../server';
import { C } from '@/constants/common';
import { INPUT } from '@/constants/component';

const { useForm } = Form;
interface IProps {}

const CreateModal: React.FC<IProps> = () => {
  const [form] = useForm();
  const t = useLocale(locale);
  const c = useLocale();

  /*--recoil--*/
  const roleId = useRecoilValue(roleIdAtom); //用户id
  const roleInfo = useRecoilValue<Partial<EditRoleParams>>(roleInfoQuery(roleId)); // 用户信息
  const [visible, setVisible] = useRecoilState(visibleAtom);
  const refreshRoleInfo = useRefreshRoleInfo(roleId);

  /*--memo--*/
  const title = useMemo(
    () => (roleId ? t['role.modal.editTitle'] : t['role.modal.createTitle']),
    [t, roleId]
  );

  /*--state--*/

  const [loading, setLoading] = useState<boolean>(false);

  /*--effect--*/
  // 刷新用户信息
  useEffect(() => {
    if (visible && roleId) {
      refreshRoleInfo();
    } else {
      form.resetFields();
    }
  }, [visible]);

  //根据角色信息更新表单值
  useEffect(() => {
    const roleData = { ...roleInfo };
    form.setFieldsValue(roleData);
  }, [roleInfo]);

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
        if (roleId) {
          res = await editRole({ ...values, id: roleId }).finally(() => {
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
  }, [roleId]);
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
      <Form form={form}>
        <Form.Item
          label={t['role.modal.name']}
          field="name"
          rules={[{ required: true, message: t['role.modal.namePlaceholder'] }]}
        >
          <Input placeholder={t['role.modal.namePlaceholder']} max={INPUT.MAX} allowClear />
        </Form.Item>
        <Form.Item label={t['role.modal.description']} field="description">
          <Input.TextArea
            placeholder={t['role.modal.descriptionPlaceholder']}
            showWordLimit
            allowClear
            maxLength={INPUT.TEXTAREA.MAXLENGTH}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateModal;
