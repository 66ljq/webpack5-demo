const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        //文件名称（指定名称+目录）
        filename: 'built.js',
        //输出文件目录（将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径的前缀，比如imgs/a.jpg' 变成 '/imgs/a.jpg'
        publicPath: '/',
        chunkFilename: 'js/[name]_chunk.js',// 非入口chunk的名称,entry指定的文件就叫入口chunk
        library: '[name]',// 整个库向外暴露的变量名
        // libraryTarget: 'window'//变量名添加到哪个上 browser上
        libraryTarget: 'global' //变量名添加到哪个上 nodejs上

    },
    plugins: [
        new HtmlwebpackPlugin()
    ],
    mode: 'development'
};

