import * as React from "react";
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'
import { Button, Spin } from "@arco-design/web-react";
import Login from "./pages/Login";
/*
 * @Author: ldm
 * @Date: 2021-11-13 17:14:18
 * @LastEditors: ldm
 * @LastEditTime: 2021-12-25 01:17:22
 * @Description: 项目入口
 */
export default function App(): React.ReactElement {
    return <>
        <RecoilRoot>

            <Login />

        </RecoilRoot>
    </>
}