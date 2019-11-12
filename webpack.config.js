const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'client/entry.tsx'),
    output: {
        filename: 'dist/[name].[contenthash].js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            cacheGroups: {
              vendor: {
                chunks: 'initial',
                name: 'vendor',
                test: 'vendor',
                enforce: true
              },
            }
          },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'server/views/index.html',
            template: 'server/layouts/index.hbs',
        }),
    ],
};