const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const path = require('path');

// For production bundle
const productionConfig = {
    output: {
        path: path.join(__dirname, 'docs'),
      },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({}),
    ],
};

module.exports = merge(commonConfig, productionConfig)
