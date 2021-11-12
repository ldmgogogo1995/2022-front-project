const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonStyleLoder = [
    // Creates `style` nodes from JS strings
    // 'style-loader',
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'
        }
    },
    // Translates CSS into CommonJS
    'css-loader',
    'postcss-loader'
]

const baseConfig = {

    // 模式：默认开发模式
    mode: 'development',
    // 入口文件
    entry: './src/global.tsx',
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
        // // 指定模块默认加载的路径
        modules: [path.resolve(__dirname, './node_modules'), 'node_modules']
    },
    // 优化策略
    optimization: {
        sideEffects: true,
        //标记未使用的代码
        usedExports: true,
        //删除useExports 标记未使用的代码
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    },

    //模块配置规则
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // 第二次构建bable会读取之前的缓存
                            cacheDirectory: true,
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
                                ],
                                [
                                    '@babel/preset-react',
                                ]
                            ]

                        }
                    },
                    {
                        loader: 'ts-loader'
                    },
                ],
                exclude: '/node-modules/'
            },
            // 处理图片
            {
                test: /\.(png|jpg|jpe?g)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    }
                },
                generator: {
                    filename: 'image/[name][ext]'
                }
            },
            {
                test: /\.css$/i,
                use: commonStyleLoder
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    ...commonStyleLoder,
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        // 启用gizp压缩
        compress: true,
        //端口号
        port: 1226,
        //启动自动更新（禁用hot）
        liveReload: true,
        open: true
    },
    // 配置目标
    target: 'web',
}
module.exports = baseConfig