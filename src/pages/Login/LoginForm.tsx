/*
 * @Author: ldm
 * @Date: 2021-12-25 14:30:58
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-24 02:07:45
 * @Description: 登录表单
 */

import { useLocale, useStorage } from '@/hooks';
import locale from './locale';
import { Form, Input, Space, Button, Checkbox, Link, Message } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import * as React from 'react';
import { login } from './server';
import { C } from '@/constants/common';
import { User, userAtom } from '@/globalAtoms/userAtoms';
import { useRecoilState } from 'recoil';
import { defaultRoute } from '@/routes';

const LoginForm: React.FC = () => {
  /*-----customhooks----*/
  const { useForm } = Form;
  const [form] = useForm();
  const t = useLocale(locale);
  /*--------state--------*/
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [rememberPassword, setRememberPassword] = React.useState<boolean>(false);
  const [loginParams, setLoginParams, removeLoginParams] = useStorage('loginParams');
  /**
   * 登陆提交账号密码
   */
  const handleSubmit = React.useCallback(() => {
    form.validate().then((value) => {
      login(value)
        .then((res) => {
          if (res.code === C.SUCCESS_CODE) {
            afterLogin(value);
          } else {
            Message.error('123');
          }
        })
        .catch((err) => Message.error('456'));
    });
  }, []);

  /**
   * @description: 登陆成功之后
   * @param {*}
   * @return {*}
   * @author: ldm
   */
  const afterLogin = React.useCallback((params) => {
    Message.success('登陆成功')
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = defaultRoute;
  }, []);

  // 读取 localStorage，设置初始值
  React.useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      form.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <>
      <div className="login-form-title">会展管理系统</div>
      <div className="login-form-sub-title">欢迎来到会展管理系</div>
      <div className={'login-form-error-msg'}>{errorMessage}</div>
      <Form form={form} layout="vertical">
        <Form.Item field="account">
          <Input prefix={<IconUser />} onPressEnter={handleSubmit} />
        </Form.Item>
        <Form.Item field="password">
          <Input.Password
            prefix={<IconLock />}
            //   placeholder={}
            onPressEnter={handleSubmit}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className="help-function">
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码</Link>
          </div>
          <Button type="primary" long onClick={handleSubmit} loading={false}>
            登陆
          </Button>
          <Button type="text" long className="register-btn">
            注册账号
          </Button>
        </Space>
      </Form>
    </>
  );
};
export default LoginForm;
