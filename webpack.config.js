const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),   //打印更新的模块路径
        new webpack.HotModuleReplacementPlugin()    //热更新插件
    ],
    module: {
        noParse: /jquery/,  //不去解析jquery中的依赖关系，如果包没有依赖项目
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,    //排除
                include: path.resolve('src'),   //包含，排除和包含加一个
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'   //解析react语法
                            ],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                ]
            }
        ]
    }
};
