module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        ['@babel/preset-react']
    ],
    // 兼容目标配置就采用.browserslistrc文件的配置
    // presets: [['@babel/preset-env', { targets: 'chrome 91' }]]
    plugins: [
        ['react-refresh/babel']
    ]
}
