import * as React from "react"

/*
 * @Author: ldm
 * @Date: 2021-11-22 16:06:07
 * @LastEditors: ldm
 * @LastEditTime: 2021-11-22 17:41:03
 * @Description: 公共头部
 */
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import './index.scss'
const { Header } = Layout
const GlobalHeader: React.FC = () => {
    return <Header className="global-header">
        公共头部
    </Header>
}
export default GlobalHeader