import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout';
import { Button, Spin, ConfigProvider } from '@arco-design/web-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useStorage } from './hooks';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import changeTheme from './utils/changeTheme';
import { GlobalContext } from './context';
/*
 * @Author: ldm
 * @Date: 2021-11-13 17:14:18
 * @LastEditors: ldm
 * @LastEditTime: 2021-12-25 01:17:22
 * @Description: 项目入口
 */
export default function App(): React.ReactElement {
  const [lang, setLang] = useStorage('ldm-lang', 'en-US');
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
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </GlobalContext.Provider>
        </RecoilRoot>
      </ConfigProvider>
    </Router>
  );
}
