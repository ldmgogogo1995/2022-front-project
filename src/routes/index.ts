/*
 * @Author: ldm
 * @Date: 2021-12-20 22:50:33
 * @LastEditors: ldm
 * @LastEditTime: 2022-01-08 00:13:24
 * @Description: 路由页面
 */

import Login from "@/pages/Login";
import * as React from "react";


interface routeType {
    name?: string
    key: string
    icon?: React.ReactNode
    children?: Array<routeType>

    componentPath?: string
}

const routes: routeType[] = [
    {

        key: 'user',
        children: [
            {
                name: '首页',
                key: 'user/login',
                componentPath: 'Login',
            } 
        ]
    }
]
export default routes