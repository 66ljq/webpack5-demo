const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules:
            [
                {
                    test: /\.css$/,
                    use:
                        [
                            // 创建style标签，将样式放入
                            // 'style-loader',所以想提取css成单独文件时，这里不能把css样式放入
                            // 使用下边的插件进行取代，提取js中的css成单独文件
                            MiniCssExtractPlugin.loader,
                            // 将css文件整合到js文件中
                            'css-loader'
                        ]
                }
            ]
    },
    plugins: [
        new HtmlwebpackPlugin(
            {
                template: './index.html'
            }
        ),
        new MiniCssExtractPlugin(
            {
                // 对输出的文件重命名
                filename: 'built.css'
            }
        )
    ]
}

