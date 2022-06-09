const path = require('path')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'
    },
    target: 'web',
    devServer: {
        hot: true
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
                        maxSize: 25 * 1024 // 设置最大阈值
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
        new CleanWebpackPlugin(),
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
        }),
        new ReactRefreshWebpackPlugin()
    ]
}