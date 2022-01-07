/*
 * @Author: ldm
 * @Date: 2021-12-25 14:30:58
 * @LastEditors: ldm
 * @LastEditTime: 2021-12-26 12:34:39
 * @Description: 登录表单
 */



import { Form } from "@arco-design/web-react"
import * as React from 'react'
const LoginForm: React.FC = () => {
    const { useForm } = Form
    const [form] = useForm()
    console.log(form, 'form')
    return <Form form={form}>
        <div className='form-title'>
            会展管理系统
        </div>
    </Form>
}
export default LoginForm