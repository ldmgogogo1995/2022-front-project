import { COPY_RIGHT } from "@/constants/common";
import * as React from "react";
import './index.scss'

/*
 * @Author: ldm
 * @Date: 2021-11-29 21:56:28
 * @LastEditors: ldm
 * @LastEditTime: 2021-11-30 01:37:16
 * @Description: 公用版权底部
 */

type Link = {
    key: string
    title: string | React.ReactElement
    href: string
    blankTarget: boolean
}
interface IProps {
    copyright: string
    links: Array<Link>
}
const DefaultFooter: React.FC<IProps> = ({
    copyright,
    links
}) => {
    return <div className='global-footer'>
        <div className='global-footer-links' >
            {links.map(link => <a title={link.key} key={link.key} target={link.blankTarget ? '_blank' : '_top'} href={link.href}>{link.title}</a>)}
        </div>
        <div className='global-footer-copyright'>
            {COPY_RIGHT} {copyright}
        </div>
    </div>

}
export default DefaultFooter