const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const resolveAppPath = require('./paths')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    target: 'web',
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 8080,
        open: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'https://api.github.com',
                pathRewrite: { '^/api': '' },
                changeOrigin: true
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ReactRefreshWebpackPlugin()
    ]
}