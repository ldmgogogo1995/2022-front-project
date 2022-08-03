/*
 * @Author: ldm
 * @Date: 2021-11-10 02:44:22
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-02 00:18:37
 * @Description: 生产环境配置
 */
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackProdConfig = merge(webpackBaseConfig, {
    // 这里生产模式对应的配置
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'index.html',
            // 用来指定，生成HTML的模板
            template: './public/document.ejs',
            // 指定变量
            title: '生产环境'
        }),

    ]
})
module.exports = WebpackProdConfig