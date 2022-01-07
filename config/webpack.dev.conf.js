/*
 * @Author: ldm
 * @Date: 2021-11-10 02:44:01
 * @LastEditors: ldm
 * @LastEditTime: 2021-11-20 04:21:05
 * @Description: 开发环境配置
 */
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.conf')
module.exports = merge(webpackBaseConfig, {
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'index.html',
            // 用来指定，生成HTML的模板
            template: './src/pages/document.ejs',
            // 指定变量
            title: '毕业设计:开发环境',
        }),
    ]
})