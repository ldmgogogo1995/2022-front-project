/*
 * @Description: 表单查询组件
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-04-01 00:04:41
 * @LastEditors: ldm
 * @LastEditTime: 2022-05-29 14:35:37
 */
import { GlobalContext } from '@/context';
import { useLocale } from '@/hooks';
import { Form, Grid, Input, Select, DatePicker, Button } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import React, { useContext } from 'react';
import styles from './index.module.less';
import locale from './locale';
type Props = {};
const { useForm } = Form;
const { Row, Col } = Grid;

const SearchForm: React.FC<Props> = ({}) => {
  const { lang } = useContext(GlobalContext);
  const [form] = useForm();
  const colSpan = lang === 'zh-CN' ? 8 : 12;
  const t = useLocale(locale);
  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row gutter={14}>
          <Col span={colSpan}>
            <Form.Item label={t['searchForm.nickname']} field="nickname">
              <Input placeholder={t['searchForm.nickname.placeholder']} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['searchForm.account']} field="account">
              <Input allowClear placeholder={t['searchForm.account.placeholder']} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['searchForm.status']} field="status">
              <Select
                placeholder={t['searchForm.status.placeholder']}
                options={[]}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['searchForm.createTime']} field="createTime">
              <DatePicker.RangePicker
                placeholder={t['searchForm.createTime.placeholder']}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />}>
          {t['searchForm.form.search']}
        </Button>
        <Button icon={<IconRefresh />}>{t['searchForm.form.reset']}</Button>
      </div>
    </div>
  );
};
export default SearchForm;
