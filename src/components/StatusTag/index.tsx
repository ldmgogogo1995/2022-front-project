/*
 * @Description: 状态标签组件
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-10-24 23:32:13
 * @LastEditors: ldm
 * @LastEditTime: 2022-10-24 23:38:33
 */
import { useLocale } from '@/hooks';
import { Tag } from '@arco-design/web-react';
import React from 'react';
import locale from './locale';
interface Props {
  status: 1 | 0;
}
const StatusTag: React.FC<Props> = ({ status }) => {
  const t = useLocale(locale);
  switch (status) {
    case 1:
      return <Tag color="#00b42a">{t['status.isUse']}</Tag>;
    default:
      return <Tag color="#f53f3f">{t['status.isForbidden']}</Tag>;
  }
};
export default StatusTag;
