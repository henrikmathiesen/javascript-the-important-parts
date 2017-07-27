/*

    Webpack has 4 core concepts
    - entry
    - output
    - loaders
    - plugins

*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //entry: path.resolve(__dirname, 'src/index.js'),   // 1 entry point
    entry: {                                            // 2 entry points
        app: path.resolve(__dirname, 'src/index.js'),
        app2: path.resolve(__dirname, 'src/index-2.js'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'                    // OBS [name]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',     // 3) injects css into DOM
                    'css-loader',       // 2) enables import css file
                    'sass-loader'       // 1) compiles sass to css
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
