import * as React from 'react';

/*
 * @Author: ldm
 * @Date: 2021-11-22 16:06:07
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-01 02:34:42
 * @Description: 公共头部
 */
import { Layout, Menu, Breadcrumb, Button, Avatar, Dropdown } from '@arco-design/web-react';
import './index.less';
import Logo from '@/assets/logo.svg';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@/globalAtoms/userAtoms';
const GlobalHeader: React.FC = () => {
  /*----customHook----*/
  const { user } = useRecoilValue(userSelector);
  /*----memo----*/
  const droplist = React.useMemo(() => [], []);
  return (
    <div className="global-header-container">
      <div className="left-content">
        <div className="logo">
          <Logo />
          <div className="name-text">DM EMG</div>
        </div>
      </div>
      <div className="right-content">
        <ul className="right-content-tags">
          <li>
            <Dropdown position="br">
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                <img
                  title={user.nickname}
                  alt="avatar"
                  src="../../../../public/images/WechatIMG2.jpeg"
                />
              </Avatar>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default GlobalHeader;
