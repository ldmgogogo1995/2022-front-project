/*
 * @Author: ldm
 * @Date: 2021-12-25 14:30:58
 * @LastEditors: ldm
 * @LastEditTime: 2021-12-26 12:34:39
 * @Description: 登录表单
 */

import { useLocale } from '@/hooks';
import locale from './locale';
import { Form, Input, Space, Button, Checkbox, Link } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import * as React from 'react';
const LoginForm: React.FC = () => {
  /*-----customhooks----*/
  const { useForm } = Form;
  const [form] = useForm();
  const t = useLocale(locale);
  /*--------state--------*/
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  /**
   * 登陆提交账号密码
   */
  const handleSubmit = React.useCallback(() => {
    form.validate().then((res) => {
    });
  }, []);
  return (
    <>
      <div className="login-form-title">会展管理系统</div>
      <div className="login-form-sub-title">欢迎来到会展管理系</div>
      <div className={'login-form-error-msg'}>{errorMessage}</div>
      <Form form={form} layout="vertical">
        <Form.Item field="userName">
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
            <Checkbox>记住密码</Checkbox>
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
