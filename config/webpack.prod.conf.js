const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const WebpackProdConfig = merge(webpackBaseConfig, {
    // 这里生产模式对应的配置
    mode: 'production'
})
module.exports = WebpackProdConfig