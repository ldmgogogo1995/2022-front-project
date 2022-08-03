/*
 * @Author: ldm
 * @Date: 2021-11-10 02:44:01
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-02 00:18:32
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
            template: './public/document.ejs',
            // 指定变量
            title: '开发环境',
        }),
    ]
})