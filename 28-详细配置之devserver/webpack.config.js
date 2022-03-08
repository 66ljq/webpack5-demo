const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new HtmlwebpackPlugin()
    ],
    mode: 'development',
    resolve: {
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        extensions: ['.js', '.json', '.css'],
        modules: ['node_modules']
    },
    devServer: {
        // 开发时可直接访问到 ./build 下的静态资源，这些资源在开发中不必打包
        // contentBase: resolve(__dirname, 'build'),在webpack5中不需要配置这个contentBase
        //启动gzip压缩
        compress: true,
        //端口号
        port: 5000,
        //域名
        host: 'localhost',
        //自动打开浏览器
        open: true,
        //开启hmr功能
        hot: true,
        // 如果出错了，不要全屏提示
        client: {
            overlay: false,
        },
        // 服务器代理，解决开发环境的跨域问题
        proxy: {
            //一旦devServer(5000)服务器接受到/api/xxx的请求，就会把请求转发到另外一个服务器
            '/api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写,将/api/xxx -->/xxx(去掉/api)
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};

