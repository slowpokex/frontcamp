const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const path = require('path');

// For development bundle
const devConfig = {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development'),
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 9000,
        open: true,
        hot: true
    },
};

module.exports = merge(commonConfig, devConfig);
