const path = require('path')
// 获取当前应用工作目录
const appDir = process.cwd()
const resolveAppPath = (relativePath) => {
    return path.resolve(appDir, relativePath)
}

module.exports = resolveAppPath