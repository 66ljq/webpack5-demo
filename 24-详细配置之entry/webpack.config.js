const { resolve } = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin')
/**
 * entry : 入口起点有三种值
 * 1. string
 * 2. array
 * 3. object
 */
module.exports = {
    entry: ['./src/index.js', './src/add.js'],
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlwebpackPlugin()
    ],
    mode: 'development'
};

