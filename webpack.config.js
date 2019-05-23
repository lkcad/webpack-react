const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    optimization: {
        splitChunks: {  //分割代码块，只有多页应用需要，
            cacheGroups: {      //缓存组
                common: {       //公共模块
                    minSize: 0,     //超过多大的抽离
                    minChunks: 2,   //引用多少次抽离
                    chunks: "initial",  // 从哪里开始  initial：从入口开始。
                },
                vendor: {
                    priority: 1,    //抽离的权重
                    test: /node_modules/,    //符合此正则的抽离出来
                    chunks: "initial",
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    entry: {
        index: './src/index.js',
        other: './src/other.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/local/, /moment/), //moment中如果引入local就将其忽略
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin({
            path: './dist'
        })
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
                            ]
                        }
                    }
                ]
            }
        ]
    }
};
