const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //打包其他资源(除了html/js/css资源以外的资源)
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    //解决:关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                },
                type:'javascript/auto'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin(
            {
                template: './src/index.html'
            }
        )
    ],
    mode: 'development'
}
