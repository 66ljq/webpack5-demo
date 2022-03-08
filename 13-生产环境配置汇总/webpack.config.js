const { resolve } = require('path');
const minicssextractplugin = require('mini-css-extract-plugin');
const cssminimizerwebpackplugin = require('css-minimizer-webpack-plugin');
const Htmlwebpackplugin = require('html-webpack-plugin');

// css浏览器兼容性处理，默认是运行在生产环境下，若要运行于开发环境，还需做以下代码
process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                // 检测css文件，并打包
                test: /\.css$/,
                use: [
                    minicssextractplugin.loader,
                    'css-loader',
                    {
                        // 对css做兼容性处理
                        // 还需要在package.json中定义browserslist
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
                // 检测less文件，并打包
                test: /\.less$/,
                // use内代码，是从下往上的顺序执行的
                use: [
                    minicssextractplugin.loader,
                    'css-loader',
                    {
                        // 还需要在package.json中定义browserslist
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')()]
                            }
                        }
                    },
                    'less-loader'
                ]
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
        new minicssextractplugin({
            // 打包提取成单独文件
            filename: 'css/built.css'
        }),
        new cssminimizerwebpackplugin(
            // 压缩css文件
        ),
        new Htmlwebpackplugin({
            template: './src/index.html',
            // 压缩html
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    // 生产环境下，js自动压缩
    mode: 'production'
}
