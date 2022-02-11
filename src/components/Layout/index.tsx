/*
 * @Author: ldm
 * @Date: 2021-11-20 03:22:49
 * @LastEditors: ldm
 * @LastEditTime: 2021-11-28 23:01:55
 * @Description: 布局组件
 */

import * as React from 'react';
import './index.less';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import { settingsAtom } from '@/globalAtoms/settingAtoms';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import { useRecoilValue } from 'recoil';
import getUrlParams from '@/utils/getUrlParams';
import qs from 'query-string';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { routes, defaultRoute } from '@/routes';
import { isArray } from '@/utils/is';
import lazyload from '@/utils/lazyload';
const { Content, Sider } = Layout;
const { useCallback, useState, useMemo } = React;
const navbarHeight = 60;
const BaseLayoutPage: React.FC = () => {
  /*-------state--------*/
  const [collapsed, setCollapsed] = useState<boolean>(false);

  /*-------customHook-----*/
  const urlParams = getUrlParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  // const defaultSelectedKeys = [currentComponent || defaultRoute];
  // const paths = (currentComponent || defaultRoute).split('/');
  // const defaultOpenKeys = paths.slice(0, paths.length - 1);
  /*-------recoil------*/
  const settings = useRecoilValue(settingsAtom);

  /*-------method------*/
  const handleCollapse = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
  }, []);

  /**
   * 递归处理给路由加component
   */
  const getFlattenRoutes = () => {
    const res = [];
    function travel(_routes) {
      debugger;
      _routes.forEach((route) => {
        if (route.key && !route.children) {
          route.component = lazyload(() => import(`../../pages/${route.key}`));
          res.push(route);
        } else if (isArray(route.children) && route.children.length) {
          travel(route.children);
        }
      });
    }
    travel(routes);
    return res;
  };
  /*---------memo---------*/
  const menuWidth = useMemo(() => (collapsed ? 48 : settings.menuWidth), [collapsed, settings]);

  const showMenu = useMemo(
    () => settings.navbar && urlParams.navbar !== false,
    [settings, urlParams]
  );

  const showNavbar = useMemo(
    () => settings.menu && urlParams.menu !== false,
    [settings, urlParams]
  );

  const showFooter = useMemo(
    () => settings.footer && urlParams.footer !== false,
    [settings, urlParams]
  );

  const flattenRoutes = useMemo(() => getFlattenRoutes(), []);
  console.log(flattenRoutes,'flattenRoutes')
  /*-------style-------*/
  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };
  return (
    <div className="layout-basic">
      <Layout>
        {showNavbar && (
          <div className="layout-nav-bar">
            <GlobalHeader />
          </div>
        )}
        <Layout className="layout-content">
          {showMenu && (
            <Sider
              className="layout-sider"
              breakpoint="xl"
              style={paddingTop}
              onCollapse={setCollapsed}
              collapsed={collapsed}
              width={menuWidth}
              collapsible
              trigger={null}
            >
              <Menu />
              <div className="collapse-btn" onClick={handleCollapse}>
                {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              </div>
            </Sider>
          )}
          <Layout style={paddingStyle}>
            <Content>
              <Routes></Routes>
            </Content>
            <GlobalFooter />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default BaseLayoutPage;
