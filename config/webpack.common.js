const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

// 导入其他配置文件信息
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')
// 为了解决配置文件路径的相对路径指向问题，单独把关于项目文件定位的相关信心放在paths.js的文件中进行管理
const resolveAppPath = require('./paths')
// 定义对象保存 base配置信息
const commonConfig = (isProduction) => {
    return {
        entry: {
            index: './src/index.js'
        },
        // entry: './src/index.js', //也就是做这里的相对路径是相对于使用webpack命令的目录
        resolve: {
            extensions: ['.js', '.json', '.jsx', '.ts', '.vue'],
            alias: {
                '@': resolveAppPath('./src'), // 允许使用别名访问src目录下的文件避免./这样的相对路径写法,避免多层级目录访问的回退查找错误，从而统一对是src下资源的访问方式。例如： 以前访问'./js/utils.js'就可以使用'@/js/utils'
                // '@components': resolveAppPath('./src/components'),
                // '@pages': resolveAppPath('./src/pages'),
                // '@utils': resolveAppPath('./src/utils'),
            },
        },
        output: {
            path: resolveAppPath('./dist'),
            filename: 'js/[name].[contenthash:8].bundle.js',
            // publicPath: 'https://cdn.test.com', // 可用于打包生产资源时配置将来资源要部署的cdn服务路径
            // filename: 'js/main.js'
            // chunkFilename: 'js/chunk_[name].js'
        },
        externals: {
            lodash: '_',
            jquery: 'jQuery'
        },
        optimization: {
            runtimeChunk: true,
            chunkIds: 'deterministic',
            minimize: true,
            minimizer: [
                // 去除LiLICLICENSE.txt文件
                new TerserWebpackPlugin({
                    extractComments: false
                }),
                new CssMinimizerPlugin() // 对css文件代码进行压缩
            ],
            /* splitChunks: {
                chunks: 'all',   // 默认是async,仅为异步导入分包；initial 可以处理同步导入的分包；all则比较强大，无论同步引入还是异步引入他都可以作用。一般项目里都比较简单粗暴使用all就可以了
                minSize: 20000,
                // maxSize: 20000,
                // minChunks: 1,
                cacheGroups: {
                    syVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        filename: 'js/[id]_vendor.js',
                        priority: -10 // 设置配置生效的优先级，值为负数，值越大，优先级越高
                    },
                    default: {
                        // 对我们自己编写的模块被引用多次的话进行分包
                        minChunks: 1,
                        filename: 'js/system_[id].js',
                        priority: -20
                    }
                }
            } */
        },
        // you can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
        // For more info visit https://webpack.js.org/guides/code-splitting/
        performance: {
            hints: false
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                esModule: false
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                esModule: false
                            }
                        },
                        // 'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png|jpe?g|svg|gif)$/,
                    type: 'asset',
                    generator: {
                        filename: '[name].[hash:8][ext]',
                        publicPath: '../img/',
                        outputPath: 'img/',
                    },
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024 // 设置最大阈值
                        }
                    }
                },
                {
                    test: /\.(ttf|woff2?)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: '[name].[hash:3][ext]',
                        publicPath: '../font/',
                        outputPath: 'font/',
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'React App built with WebPack',
                template: './public/index.html'
            }),
            new DefinePlugin({
                BASE_URL: '"./"' // 这里根据给的内容去定义常量，所以需要两层引号
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        // To: './dist', // 这里可以忽略简写，因为不给to,默认会存放到webpack配置的output的path指定的目录
                        globOptions: {
                            ignore: ['**/index.html']
                        }
                    }
                ]
            })
        ]
    }
}


module.exports = (env) => {
    const isProduction = env.production
    // 设置打包环境，让其他配置文件中也可以获取该值进行对相应的环境判断
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    // 依据当前的打包模式来合并配置信息
    const config = isProduction ? prodConfig : devConfig
    // 返回合并后的配置信息
    const mergedConfig = merge(commonConfig(isProduction), config)
    // console.log('wrap 前-------->\n', mergedConfig.plugins)
    // const wrappedConfig = isProduction ? smp.wrap(mergedConfig) : mergedConfig
    // console.log('wrap 后-------->\n', wrappedConfig.plugins)
    return mergedConfig
    // return wrappedConfig
}