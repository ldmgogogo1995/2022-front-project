/*
 * @Author: ldm
 * @Date: 2021-11-20 03:22:49
 * @LastEditors: ldm
 * @LastEditTime: 2021-11-28 23:01:55
 * @Description: 布局组件
 */

import * as React from "react"
import './index.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
const { Content, Sider, } = Layout
const { useCallback, useState, } = React

const BaseLayoutPage: React.FC = ({
    children
}) => {
    const handleCollapse = useCallback(() => {
        console.log('handleCollapse')
    }, [])
    return <div className='layout-basic'>
        <Layout>
            <Sider
                theme='dark'
                breakpoint='lg'
                onCollapse={handleCollapse}
                // collapsed={this.state.collapsed}
                width={220}
                collapsible
            >
                <Menu />
            </Sider>
            <Layout>
                <GlobalHeader />
                <Layout>
                    <Content>{children}</Content>
                    <GlobalFooter />
                </Layout>
            </Layout>
        </Layout>
    </div >
}
export default BaseLayoutPage
