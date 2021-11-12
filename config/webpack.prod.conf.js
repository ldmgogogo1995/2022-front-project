const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackProdConfig = merge(webpackBaseConfig, {
    // 这里生产模式对应的配置
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            // 指定打包后的文件名称
            filename: 'index.html',
            // 用来指定，生成HTML的模板
            template: './src/pages/document.ejs',
            // 指定变量
            title: '毕业设计'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })
    ]
})
module.exports = WebpackProdConfig