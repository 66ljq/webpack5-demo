const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
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
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new HtmlwebpackPlugin()
    ],
    mode: 'development',
    // 解析模块的规则
    resolve: {
        //配置解析模块路径别名.优点：可以简写路径，缺点：没有路径提示了
        // 在index.js中引入css文件时，只需写$css/index.css，即自动定位到src/css文件夹，在寻找index.css
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        //省略文件路径的后缀名,比如引入index.css时，可以只写到index即可。
        extensions: ['.js', '.json', '.css'],
        // 告诉webpack 解析模块是去找哪个目录
        // 默认是node_modules
        modules: ['node_modules']

    }
};

