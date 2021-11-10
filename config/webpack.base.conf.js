const path = require('path')
const baseConfig = {

    // 模式：默认开发模式
    mode: 'development',
    // 入口文件
    entry: './src/index.tsx',
    //出口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle[chunkhash:8].js'
    },
    // 模块解析规则
    resolve: {
        alias: {
            // 指定路径的别名
            "@": path.resolve('src')
        },
        // 指定引入文件的后缀名（指定之后，在引入文件时，可以省略后缀名）
        extensions: [
            ".js", ".ts", ".jsx", ".tsx"
        ],
        // 指定模块默认加载的路径
        modules: [path.resolve(__dirname, './node_modules'), 'node_modules']
    },
    //模块配置规则
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        //core-js 版本,
                                        corejs: 3,
                                        //兼容指定浏览器版本
                                        targets: {
                                            chrome: 58,
                                            ie: '9',
                                            firefox: '60',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    },
                                ]
                                , [
                                    '@babel/preset-react',
                                ]
                            ]

                        }
                    }
                ],
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
}
module.exports = baseConfig