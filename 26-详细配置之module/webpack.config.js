const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        //文件名称（指定名称+目录）
        filename: 'built.js',
        //输出文件目录（将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                //loder的配置
                test: /\.css$/,
                //多个loader用use
                use: ['style-loader ', 'css-loader']
            },
            {
                test: /\.js$/,
                // exclude排除检查node_modules下的js文件
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                // enforce: 'pre',
                //单个loader用loader
                loader: 'eslint-loader',
            },
            {
                // 以下loader配置只会生效一个
                oneOf: []
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin()
    ],
    mode: 'development'
};

