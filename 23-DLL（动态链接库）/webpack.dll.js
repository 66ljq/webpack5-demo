/*
使用dll技术，对某些库（第三方库:jquery、react、vue. . . )进行单独打包
当你运行webpack时，默认查找webpack.config.js配置文件
而我们需要运行webpack.dll.js文件
所以输入命令: webpack --config webpack.dll.js,进行修改

*/
const { resolve } = require('path');
// webpack自带的插件
const webpack = require('webpack')
module.exports = {
    entry: {
        //最终打包生成的[name] --> jquery
        // ['jquery']-- > 要打包的库是jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash:10]'// 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 使用webpack自带的插件，打包生成一个manifest.json文件，提供和jquery的映射
        new webpack.DllPlugin({
            name: '[name]_[hash:10]',//映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json')//输出文件路径
        })
    ],
    mode: 'production'
}

