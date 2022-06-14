const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const glob = require('glob')
const webpack = require('webpack')

const resolveAppPath = require('./paths')

module.exports = {
    mode: 'production',
    optimization: {
        // usedExports: true, // 标记不被使用的函数内容
        minimize: true,
        minimizer: [
            // 去除LiLICLICENSE.txt文件
            new TerserWebpackPlugin({
                extractComments: false
            }),
            new CssMinimizerPlugin() // 对css文件代码进行压缩
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            // chunkFilename: 'css/chunk.[id].css'
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(), // about scope hositing 作用域提升
        new PurgeCSSPlugin({
            paths: glob.sync(`${resolveAppPath('./src')}/**/*`, { nodir: true }), // css tree shaking file paths
            safelist: function () {
                return ['body', 'html', 'container']  // point out the style label/classname need to be reserve
            }
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/, // 设置需要被压缩的文件匹配规则
            minRatio: 0.8, // 设置需要达到的压缩比例阈值，压缩低于该比例的才值得被压缩。
            // threshold: 10000, 需要达到一定的文件大小才会被压缩，使用默认值进行了，不需要配置
            algorithm: 'gzip', // 设置使用的压缩算法
        }),
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/]),
        // new BundleAnalyzerPlugin() // 可用于分析打包的内容文件大小等基本信息
        // new webpack.debug.ProfilingPlugin() // 未能使用，估计又是版本问题
    ]
}