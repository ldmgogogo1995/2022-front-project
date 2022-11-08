/*
 * @Description: 自定义分页组件
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-27 18:41:23
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-29 02:19:24
 */

import { Pagination } from '@arco-design/web-react';
import { PaginationState } from '@arco-design/web-react/es/Pagination/pagination';
import React from 'react';
import style from './index.module.less';
interface IProps extends PaginationState {
  [key: string]: any;
}
const CustomPagination: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <div className={style['constom-pagination-wrap']}>
      <Pagination {...props} />
    </div>
  );
};
export default CustomPagination;
