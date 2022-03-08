/*工作流程
loader: 1下载 2使用（配置loader)
plugins: 1.下载 2.引入 3使用
*/
const { resolve } = require('path');
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js', output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },

    module: {
        rules: [
            // loader的配置
        ]
    },
    plugins: [
        //plugins的配置
        // html-webpack-plugin配置
        // 功能:默认会创建一个空的HTML，自动引入打包输出的所有资源(S/cSs)
        new HtmlWebpackPlugin({
            //复制'./src/index.html’文件，并自动引入打包输出的所有资源（JS/cSs)
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
