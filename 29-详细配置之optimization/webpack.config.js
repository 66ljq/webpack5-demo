const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
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
    mode: 'production',
    resolve: {
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        extensions: ['.js', '.json', '.css'],
        modules: ['node_modules']
    },
    // 代码分割的配置，可以将node_modules中代码单独打包一个chunk输出
    // 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk输出
    optimization: {
        splitChunks: {
            chunks: 'all',
            // 如果使用默认值，下边内容可以不写
            // minsize: 30 * 1024,// 分割的chunk最小为30kb,低于30kb就不分割
            // maxSize: 0,//最大没有限制
            // minChunks: 1,//要提取的chunk最少被引用1次
            // maxAsyncRequests: 5,// 按需加载时，并行加载的文件最大数量为5
            // maxInitialRequests: 3,//入口js文件最大并行请求数量
            // automaticNameDelimiter: '~',
            // name: true,// 可以使用命名规则
            // cacheGroups: {// 分割chunk的组
            //     // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
            //     //满足上面的公共规则，如:大小超过3okb，至少被引用一次。
            //     defaultvendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         // 优先级为-10
            //         priority: -10
            //     },
            //     default: {
            //         //要提取的chunk最少被引用2次,会覆盖掉前边代码规定的公共的引用规则设定
            //         minChunks: 2,
            //         //优先级
            //         priority: -20,
            //         //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
            //         reuseExistingChunk: true
            //     }
            // }
        },
        // 将当前模块中，记录其他模块的hash值单独打包为一个文件runtime
        // 解决问题：修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
        minimizer: [
            //配置生产环境的压缩方案:js和css
            // 需要下载插件terser-webpack-plugin
            // webpack v5 开箱即带有最新版本的 terser-webpack-plugin
            new TerserPlugin({
                // 开启多进程打包
                parallel: true,
            })
        ]
    }
};

