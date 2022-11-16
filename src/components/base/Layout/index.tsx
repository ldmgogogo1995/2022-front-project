/*
 * @Author: ldm
 * @Date: 2021-11-20 03:22:49
 * @LastEditors: ldm
 * @LastEditTime: 2022-11-09 00:53:07
 * @Description: 布局组件
 */

import * as React from 'react';
import './index.less';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import { settingsAtom } from '@/globalAtoms/settingAtoms';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import { useRecoilValue } from 'recoil';
import getUrlParams from '@/utils/getUrlParams';
import qs from 'query-string';
import {
  IconApps,
  IconCheckCircle,
  IconDashboard,
  IconExclamationCircle,
  IconFile,
  IconList,
  IconLock,
  IconMenuFold,
  IconMenuUnfold,
  IconSettings,
  IconUser,
} from '@arco-design/web-react/icon';
import { routes, defaultRoute } from '@/routes';
import { isArray } from '@/utils/is';
import lazyload from '@/utils/lazyload';
import ErrorBoundary from '../ErrorBoundary';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks';
import NProgress from 'nprogress';
const { Content, Sider } = Layout;
const { useCallback, useState, useMemo, useRef, useEffect } = React;
const { SubMenu, Item: MenuItem } = Menu;
const navbarHeight = 60;
const BaseLayoutPage: React.FC = () => {
  const locale = useLocale();
  /*-------customHook-----*/
  const urlParams = getUrlParams();
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  // const defaultOpenKeys = paths.slice(0, paths.length - 1);
  const defaultOpenKeys = paths.slice(0, paths.length - 1);
  /*-------recoil------*/
  const settings = useRecoilValue(settingsAtom);
  /*-------state--------*/
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [breadcrumb, setBreadCrumb] = useState<Array<React.ReactNode>>([]);
  /*-------method------*/
  const handleCollapse = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
  }, []);

  const getIconFromKey = (key: string) => {
    switch (key) {
      case 'Authority':
        return <IconLock className={'icon'} />;
      case 'list':
        return <IconList className={'icon'} />;
      case 'form':
        return <IconSettings className={'icon'} />;
      case 'profile':
        return <IconFile className={'icon'} />;
      case 'visualization':
        return <IconApps className={'icon'} />;
      case 'result':
        return <IconCheckCircle className={'icon'} />;
      case 'exception':
        return <IconExclamationCircle className={'icon'} />;
      case 'user':
        return <IconUser className={'icon'} />;
      default:
        return <div className={'icon-empty'} />;
    }
  };

  const renderRoutes = (locale) => {
    const nodes = [];
    function travel(_routes, level, parentNode = []) {
      return _routes.map((route) => {
        const { breadcrumb = true } = route;

        const iconDom = getIconFromKey(route.key);
        const titleDom = (
          <>
            {iconDom} {locale[route.name] || route.name}
          </>
        );
        if (
          route.component &&
          (!isArray(route.children) || (isArray(route.children) && !route.children.length))
        ) {
          routeMap.current.set(`/${route.key}`, breadcrumb ? [...parentNode, route.name] : []);
          if (level > 1) {
            return <MenuItem key={route.key}>{titleDom}</MenuItem>;
          }
          nodes.push(
            <MenuItem key={route.key}>
              <Link to={`/${route.key}`}>{titleDom}</Link>
            </MenuItem>
          );
        }
        if (isArray(route.children) && route.children.length) {
          const parentNode = [];
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom);
          }

          if (level > 1) {
            return (
              <SubMenu key={route.key} title={titleDom}>
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            );
          }
          nodes.push(
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
      });
    }
    travel(routes, 1);
    return nodes;
  };

  /**
   * 递归处理给路由加component
   */
  const getFlattenRoutes = () => {
    const res = [];
    function travel(_routes) {
      _routes.forEach((route) => {
        if (route.key && !route.children) {
          route.component = lazyload(() => import(`../../../pages/${route.key}`));
          res.push(route);
        } else if (isArray(route.children) && route.children.length) {
          travel(route.children);
        }
      });
    }
    travel(routes);
    return res;
  };

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      setSelectedKeys([key]);
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      NProgress.done();
    });
  }
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
  /*-------style-------*/
  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };
  /*-------effect-------*/
  useEffect(() => {
    const routeConfig = routeMap.current.get(pathname);
    setBreadCrumb(routeConfig || []);
  }, [pathname]);

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
              <Menu
                collapse={collapsed}
                onClickMenuItem={onClickMenuItem}
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
              >
                <div className="menu-wrap">{renderRoutes(locale)}</div>
              </Menu>

              <div className="collapse-btn" onClick={handleCollapse}>
                {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              </div>
            </Sider>
          )}
          <Layout className="layout-body" style={paddingStyle}>
            <div className={'layout-content-wrapper'}>
              {!!breadcrumb.length && (
                <div className={'layout-breadcrumb'}>
                  <Breadcrumb>
                    {breadcrumb.map((node, index) => (
                      <Breadcrumb.Item key={index}>
                        {typeof node === 'string' ? locale[node] || node : node}
                      </Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </div>
              )}
              <Content>
                <ErrorBoundary>
                  <Switch>
                    {flattenRoutes.map((route, index) => {
                      return (
                        <Route key={index} path={`/${route.key}`} component={route.component} />
                      );
                    })}
                    <Redirect push to={`/${defaultRoute}`} />
                  </Switch>
                </ErrorBoundary>
              </Content>
            </div>
            <GlobalFooter />
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default BaseLayoutPage;
