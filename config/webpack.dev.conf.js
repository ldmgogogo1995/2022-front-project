const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.conf')
module.exports = merge(webpackBaseConfig, {
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'index.html',
            // 用来指定，生成HTML的模板
            template: './src/pages/document.ejs',
            // 指定变量
            title: '毕业设计'
        }),
        new CleanWebpackPlugin()
    ]
})