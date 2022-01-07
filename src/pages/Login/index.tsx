/*
 * @Author: ldm
 * @Date: 2021-12-18 00:49:12
 * @LastEditors: ldm
 * @LastEditTime: 2021-12-25 19:49:53
 * @Description: 登录页
 */

import GlobalFooter from '@/components/Layout/GlobalFooter'
import * as React from 'react'
import LoginForm from './LoginForm'
import './index.less'
type LoginProps = {

}
const Login: React.FC<LoginProps> = ({

}) => {
    return <div className='login-page-container'>
        <div className='login-banner'>

        </div>
        <div className='login-content'>
            <div className='login-form'>
                <LoginForm/>    
            </div>
            <div className='login-footer'>
                <GlobalFooter />
            </div>

        </div>
    </div>
}
export default Login