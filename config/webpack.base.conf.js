const path = require('path')
const baseConfig = {

    // 模式：默认开发模式
    mode: 'development',
    // 入口文件
    entry: './src/index.ts',
    //出口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle[chunkhash:8].js'
    },
    //模块配置规则
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: '/node-modules/'
            }
        ]
    },
    devServer: {
        // 启用gizp压缩
        compress: true,
        //端口号
        port: 1226,
        //启动自动更新（禁用hot）
        liveReload: true,
        open: true
    },
    plugins: [

    ]

}
module.exports = baseConfig