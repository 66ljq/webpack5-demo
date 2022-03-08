/**
 * 启动devServer命令：
 * npx webpack serve
 * 开发环境的性能优化（HMR）:hot module replacement热模块替换/模块热替换
    作用:一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块)极大提升构建速度.
    样式文件:可以使用HMR功能:因为style-loader内部实现了~
    js文件:默认不能使用HMR功能
    html文件:默认不能使用HMR功能.同时会导致问题: html文件不能热更新了~,在入口entry属性中配置上html文件即可解决
 */

const { resolve } = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules:  [
        {
            // 处理less资源
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
            // 处理css资源
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            // js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env', {
                            useBuiltIns: 'usage',
                            corejs:
                            {
                                version: 3
                            },
                            targets: {
                                // 浏览器兼容的版本
                                chrome: '60',
                                firefox: '50'
                            }
                        }
                    ]
                ]
            }

        },
        {
            //对图片进行打包处理
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 8 * 1024,
                outputPath: 'imgs',
                esModule: false
            },
            type: 'javascript/auto'
        },
        {
            // 处理html中的图片文件
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                esModule: false,
            }

        },
        {
            // 处理其他文件，如字体图标等
            exclude: /\.(js|css|less|html|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'media',
                esModule: false,
            },
            type: 'javascript/auto'
        }
    ]
  },
  plugins: [
    // plugins的配置
    new Htmlwebpackplugin({
        template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true
  },
  // source-map:一种提供源代码到构建后（打包）代码映射技术（如果构建后（打包）代码出错了，
  //通过映射可以追踪源代码错误)。
  // 开启source-map，打包后会生成一个.js.map文件
  devtool: 'source-map',
  // 测试不同种类的source-map
  // devtool: 'eval-source-map',
  mode: 'development'
};
/*
有如下几个组合source-map
[inline-|hidden-|eval-] [nosources-] [cheap-[ module-]] source-map
inline-source-map:把原本单独生成的built.js.map文件，整体内嵌到了built.js中尾部去了
hidden-source-map:单独生成一个built.js.map文件，
eval-source-map:内嵌到built.js中，但是是以分段的形式，从头至尾，遍布于整个.js文件中
nosources-source-map：单独生成一个built.js.map文件
cheap-source-map：单独生成一个built.js.map文件
cheap-module-source-map:单独生成一个built.js.map文件。
*/ 
