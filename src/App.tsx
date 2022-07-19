/*
 * @Author: ldm
 * @Date: 2021-11-13 17:14:18
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-20 00:58:41
 * @Description: 项目入口
 */
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout';
import { Button, Spin, ConfigProvider } from '@arco-design/web-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useStorage } from './hooks';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import changeTheme from './utils/changeTheme';
import { GlobalContext } from './context';
import checkLogin from './utils/checkLogin';

export default function App(): React.ReactElement {
  const [lang, setLang] = useStorage('ldm-lang', 'zh-CN');
  const [theme, setTheme] = useStorage('ldm-theme', 'light');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {}

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };
  return (
    <Router>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <RecoilRoot>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Layout} />
            </Switch>
          </GlobalContext.Provider>
        </RecoilRoot>
      </ConfigProvider>
    </Router>
  );
}
