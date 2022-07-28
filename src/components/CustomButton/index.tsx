import { Button } from '@arco-design/web-react';
import React from 'react';

/*
 * @Description: 根据不同场景定制特殊的button
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-07-29 02:07:15
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-29 02:16:22
 */
interface IProps {
  CustomType: 'ACTION_BTN';
}
const CustomButton: React.FC<IProps> = ({ CustomType, children, ...props }) => {
  switch (CustomType) {
    case 'ACTION_BTN':
      return (
        <Button {...props} type="text" size="small">
          {children}
        </Button>
      );

    default:
      return <Button {...props}>{children}</Button>;
  }
};
export default CustomButton;
