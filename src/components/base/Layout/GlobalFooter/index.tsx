import * as React from "react"
import { IconGithub } from '@arco-design/web-react/icon'
/*
 * @Author: ldm
 * @Date: 2021-11-22 16:04:57
 * @LastEditors: ldm
 * @LastEditTime: 2021-11-30 01:20:52
 * @Description: 公共底部
 */

import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import DefaultFooter from "@/components/DefualtFooter";
const { Footer } = Layout
const GlobalFooter: React.FC = () => {
    return <Footer>
        <DefaultFooter copyright='2021 毕业设计 by luodaming' links={[
            {
                key: 'CSND',
                title: 'CSND',
                href: 'https://blog.csdn.net/weixin_46198494?spm=1001.2100.3001.5113',
                blankTarget: true,
            },
            {
                key: 'github',
                title: <IconGithub />,
                href: 'https://github.com/ldmgogogo1995',
                blankTarget: true,
            },
            {
                key: 'Arco Design',
                title: 'Arco Design',
                href: 'https://arco.design/',
                blankTarget: true,
            },
        ]} />
    </Footer>
}
export default GlobalFooter