/*
 * @Description: 表单查询组件
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-04-01 00:04:41
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-31 03:01:47
 */
import { GlobalContext } from '@/context';
import { useLocale } from '@/hooks';
import { Form, Grid, Input, Select, DatePicker, Button } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import React, { useCallback, useContext } from 'react';
import styles from './index.module.less';
import locale from './locale';
import { QueryUserListParams } from './server';
import D from 'dayjs';
type Props = {
  setFormParams: React.Dispatch<React.SetStateAction<Partial<QueryUserListParams>>>;
};
const { useForm } = Form;
const { Row, Col } = Grid;

const SearchForm: React.FC<Props> = ({ setFormParams }) => {
  const { lang } = useContext(GlobalContext);
  const [form] = useForm();
  const colSpan = lang === 'zh-CN' ? 8 : 12;
  const t = useLocale(locale);

  /*--method--*/
  /**
   * @description: 点击查询按钮
   * @return {*}
   * @author: ldm
   */
  const handleSearch = useCallback(() => {
    const formParams = form.getFieldsValue();
    if (formParams?.createDate?.length) {
      formParams.startCreateDate = D(formParams.createDate.at(0)).startOf('day').valueOf();
      formParams.endCreateDate = D(formParams.createDate.at(1)).startOf('day').valueOf();
    }
    setFormParams(formParams);
  }, [form]);

  /**
   * @description:重置表单值
   * @return {*}
   * @author: ldm
   */
  const handleReset = useCallback(() => {
    form.resetFields();
    setFormParams({});
  }, [form]);
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
            <Form.Item label={t['searchForm.createDate']} field="createDate">
              <DatePicker.RangePicker
                placeholder={t['searchForm.createDate.placeholder']}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
          {t['searchForm.form.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t['searchForm.form.reset']}
        </Button>
      </div>
    </div>
  );
};
export default SearchForm;
