const { resolve } = require('path');
const Htmlwebpackplugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new Htmlwebpackplugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
    ],
    optimization: {
        splitChunks: { chunks: 'all' }
    },
    mode: 'production'
}
