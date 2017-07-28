/*

    Webpack has 4 core concepts
        - entry
        - output
        - loaders
        - plugins

    Webpack devServer: compiled code is kept in memory (not written to disc), this is good for performance

    About sourcemaps: many options, read about them here
        - http://cheng.logdown.com/posts/2016/03/25/679045
        - https://webpack.js.org/configuration/devtool/

    autoprefixer gets its options from entry in package.json, that entry is shared with other tools like babel

*/

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: function () {
            return [
                autoprefixer()
            ]
        }
    }
};

module.exports = {
    //entry: path.resolve(__dirname, 'src/index.js'),                       // 1 entry point
    entry: {                                                                // 2 entry points
        app: path.resolve(__dirname, 'src/index.js'),
        app2: path.resolve(__dirname, 'src/index-2.js'),
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')             // copy to dist and inject scripts/css (need to handle this together with templating)
        })
        // new HtmlWebpackPlugin, for another html file
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'                                        // OBS [name] for generated entry point file
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',                                         // 2) compile to ES5
                    'eslint-loader'                                         // 1) lint ES6
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',                                         // 4) injects css into DOM
                    'css-loader',                                           // 3) enables import css file
                    postCssLoader,                                          // 2) post css transforms
                    'sass-loader'                                           // 1) compiles sass to css
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
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
}
