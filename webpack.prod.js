const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

// For production bundle
const productionConfig = {
    // devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({}),
    ],
};

module.exports = merge(commonConfig, productionConfig)
