const presets = [
    [
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            corejs: 3
        }
    ],
    ['@babel/preset-react']
]

const plugins = []
// 依据当前打包模式环境来决定plugins的值
const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
    plugins.push(['react-refresh/babel'])
}

module.exports = {
    presets, plugins
}
