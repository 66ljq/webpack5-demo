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
                type: 'javascript/auto'
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
    mode: 'development',


    // 开发服务器devservewr;用来自动化（编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出。
    //启动指令为 npx webpack serve,前提要下该包
    devServer: {
        // 开发时可直接访问到 ./build 下的静态资源，这些资源在开发中不必打包
        // contentBase: resolve(__dirname, 'build'),在webpack5中不需要配置这个contentBase
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        // 自动打开浏览器
        open: true,

    }
}
