const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
// 导入其他配置文件信息
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')
// 为了解决配置文件路径的相对路径指向问题，单独把关于项目文件定位的相关信心放在paths.js的文件中进行管理
const resolveAppPath = require('./paths')
// 定义对象保存 base配置信息
const commonConfig = {
    entry: './src/index.js', //也就是做这里的相对路径是相对于使用webpack命令的目录
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
        filename: 'js/main.js'
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
                    'style-loader',
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
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            esModule: false
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:8][ext]'
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
                    filename: 'font/[name].[hash:8][ext]'
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

module.exports = (env) => {
    const isProduction = env.production
    // 设置打包环境，让其他配置文件中也可以获取该值进行对相应的环境判断
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    // 依据当前的打包模式来合并配置信息
    const config = isProduction ? prodConfig : devConfig
    // 返回合并后的配置信息
    const mergedConfig = merge(commonConfig, config)
    return mergedConfig
}