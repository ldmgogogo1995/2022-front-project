/*
 * @Description: 用户新增/编辑弹窗
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-31 19:25:19
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-05 20:04:58
 */

import locale from '../locale';
import { Form, Input, InputNumber, Message, Modal, Radio, Select } from '@arco-design/web-react';
import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { roleListQuery, userIdAtom, userInfoQuery, visibleAtom } from '../model';
import { useLocale } from '@/hooks';
import { createUser, editUser } from '../server';
import { C } from '@/constants/common';

const { useForm } = Form;
interface IProps {}

const CreateModal: React.FC<IProps> = () => {
  const [form] = useForm();
  const t = useLocale(locale);
  const c = useLocale();
  /*--recoil--*/
  const userId = useRecoilValue(userIdAtom); //用户id
  const userInfo = useRecoilValue(userInfoQuery(userId)); // 用户信息
  const roleList = useRecoilValue(roleListQuery);
  const [visible, setVisible] = useRecoilState(visibleAtom);
  /*--memo--*/
  const title = useMemo(
    () => (userId ? t['user.modal.editTitle'] : t['user.modal.createTitle']),
    [t, userId]
  );
  const roleOptions = useMemo(
    () =>
      roleList.map((role) => ({
        label: role.name,
        value: role.id,
      })),
    [roleList]
  );
  /*--state--*/

  const [loading, setLoading] = useState<boolean>(false);

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
        if (values.id) {
          res = await editUser(values).finally(() => {
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
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, []);
  return (
    <Modal onCancel={handleCancel} onOk={handleSubmit} visible={visible} title={title}>
      <Form form={form}>
        <Form.Item
          label={t['user.modal.nickname']}
          field="nickname"
          rules={[{ required: true, message: t['user.modal.nicknamePlaceholder'] }]}
        >
          <Input placeholder={t['user.modal.nicknamePlaceholder']} max={50} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.account']}
          field="account"
          rules={[{ required: true, message: t['user.modal.accountPlaceholder'] }]}
        >
          <Input placeholder={t['user.modal.accountPlaceholder']} max={50} />
        </Form.Item>
        <Form.Item
          label={t['user.modal.password']}
          field="password"
          rules={[{ required: true, message: t['user.modal.passwordPlaceholder'] }]}
        >
          <Input placeholder={t['user.modal.passwordPlaceholder']} max={50} />
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
          <InputNumber max={18} placeholder={t['user.modal.phonePlaceholder']} />
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
      </Form>
    </Modal>
  );
};
export default CreateModal;
