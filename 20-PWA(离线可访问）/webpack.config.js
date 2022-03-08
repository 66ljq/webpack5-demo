const { resolve } = require('path');
const minicssextractplugin = require('mini-css-extract-plugin');
process.env.NODE_ENV = 'production'
const cssminimizerwebpackplugin = require('css-minimizer-webpack-plugin');
const Htmlwebpackplugin = require('html-webpack-plugin');
const workboxwebpackplugin = require('workbox-webpack-plugin')
// PWA:渐进式网络开发应用程序（离线可访问）
// 通过一个插件workbox-webpack-plugin

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{

            oneOf: [
                {
                    test: /\.css$/,
                    use: [
                        minicssextractplugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [require('postcss-preset-env')()]
                                }
                            }
                        }
                    ]
                },
                {
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
                                        chrome: '60',
                                        firefox: '50'
                                    }
                                }
                            ]
                        ],
                        cacheDirectory: true,
                    }

                },
                {
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
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        esModule: false,
                    }

                },
                {
                    exclude: /\.(js|css|less|html|jpg|png|gif)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media',
                        esModule: false,
                    },
                    type: 'javascript/auto'
                }
            ]
        }
        ]
    },
    plugins: [
        new minicssextractplugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new cssminimizerwebpackplugin(
        ),
        new Htmlwebpackplugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        // 使用PWA
        new workboxwebpackplugin.GenerateSW({
            // 进行两个设置，分别：
            // 1.帮助serviceworker快速启动
            //2.删除旧的serviceworkerl
            // 最后生成一个serviceworker配置文件
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production'
}
