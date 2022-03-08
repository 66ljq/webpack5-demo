
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js', output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    // 外部扩展(externals)
    // 防止将某些 import 的包(package)打包到 built 中，
    externals: {
        jquery: 'jQuery'
    }
}
