/**
 * 开发环境的配置
 */
 const { resolve } = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin')
 module.exports = {
     entry: './src/index.js',
     output: {
         filename: 'built.js',
         path: resolve(__dirname, 'build')
     },
     module: {
         rules: [
             // loader的配置
             {
                 //处理less资源
                 test: /\.less$/,
                 use: [
                     'style-loader',
                     'css-loader',
                     'less-loader'
                 ],
                 type: 'javascript/auto'
             },
             {
                 //处理css资源
                 test: /\.css$/,
                 use: [
                     'style-loader',
                     'css-loader'
                 ],
                 type: 'javascript/auto'
             },
             {
                 //处理图片资源Ⅰ
                 test: /\.(jpg|png|gif)$/,
                 loader: 'url-loader',
                 options: {
                     limit: 8 * 1024,
                     // 关闭ES6模块化
                     esModule: false
                 },
                 type: 'javascript/auto'
             },
             {
                 //处理html中img资源
                 test: /\.html$/,
                 loader: 'html-loader',
                 options: {
                     esModule: false,
                 }
             },
             {
                 //处理其他资源
                 exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                 loader: 'file-loader',
                 options: {
                     esModule: false,
                 },
                 type: 'javascript/auto'
             }
         ]
     },
     plugins: [
         // plugins的配置
         new HtmlWebpackPlugin({
             template: './src/index.html'
         })
     ],
     devServer: {
         compress: true,
         port: 3000,
         open: true
     },
     mode: 'development'
 }
 