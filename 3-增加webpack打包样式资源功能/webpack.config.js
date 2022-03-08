/*
webpack.config.js webpack的配置文件
作用:指示 webpack干哪些活（当你运行 webpack指令时，会加载里面的配置)
所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

//resolve用来拼接绝对路径的方法
const { resolve } = require('path');

// webpack配置
module.exports = {
    //配置开发环境模式
    mode: 'development',
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //_dirname 是nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: [
            //详细loader配置
            {
                //表示正则表达式，\.表示. $表示以什么结尾,匹配结束
                //匹配哪些文件
                test: /\.css$/,
                //使用哪些loader进行处理
                use: [
                    //  use数组中loader执行顺序:从右到左，从下到上依次执行
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            }
        ]
    },
    //plugins插件的配置
    plugins: [
        //详细plugins的配置
    ],
}
