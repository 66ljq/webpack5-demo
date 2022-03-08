const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 设置node.js环境变量，使其默认是处于开发环境development，不是生产环境
process.env.NODE_ENV = 'development'
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
                            'css-loader',
                            //css兼容性处理: postcss --> 插件postcss-loader 、postcss-preset-env
                            //这些插件帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                            //使用loader的默认配置
                            //"postcss-loader',
                            //修改loader的配置
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [require('postcss-preset-env')()]
                                    }
                                }
                            }
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
