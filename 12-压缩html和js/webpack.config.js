const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: './src/index.html',
            // 压缩html选项
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
    ],
    //生产环境下会自动压缩js代码
    mode: 'production'
}

