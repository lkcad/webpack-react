const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:2].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/local/, /moment/), //moment中如果引入local就将其忽略
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new Happypack({
            id: 'js',
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
        })
    ],
    module: {
        noParse: /jquery/,  //不去解析jquery中的依赖关系，如果包没有依赖项目
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,    //排除
                include: path.resolve('src'),   //包含，排除和包含加一个
                use: 'happypack/loader?id=js'
            }
        ]
    }
};
