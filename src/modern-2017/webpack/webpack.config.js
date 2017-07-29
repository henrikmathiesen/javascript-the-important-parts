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

    prod builds
        - webpack -p from command line
            * runs minification
            * sets NODE_ENV to 'process.env.NODE_ENV': JSON.stringify('production')
                * it converts the object to a string (just like envify), https://webpack.js.org/guides/production/#node-environment-variable
            * NODE_ENV is NOT set within this config file however, so can not check against it here (without setting it again before running webpack)
            * If we want to send parameters to this config, we can do it like we are doing it here in this file
        - sending parameters into this file is a way to toggle dev/prod builds
        - another alternative is to use 2 config files, webpack.dev.config.js and webpack.prod.config.js, and use either from npm script, but that would lead to duplicate code between the two
        - a third option is to to use 3 config files: a common, a dev and a prod and then merge them. https://webpack.js.org/guides/production/#node-environment-variable
        

*/

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: true
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: function () {
            return [
                autoprefixer()
            ]
        },
        sourceMap: true
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

module.exports = {
    //entry: path.resolve(__dirname, 'src/index.js'),                       // 1 entry point
    entry: {                                                                // 2 entry points
        app: path.resolve(__dirname, 'src/index.js'),
        app2: path.resolve(__dirname, 'src/index-2.js'),
    },
    devtool: 'source-map',                                                  // cheap-module-eval-source-map is the faster option, but does not work with CSS
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('[name].bundle.css'),                         // extract css to seperate file, instead of injecting into DOM (see loader also)
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
                // use: [
                //     'style-loader',                                         // 4) injects css into DOM
                //     'css-loader',                                           // 3) enables import css file
                //     postCssLoader,                                          // 2) post css transforms
                //     'sass-loader'                                           // 1) compiles sass to css
                // ]

                // extract css to seperate file, instead of injecting into DOM (see plugins also)
                use: ExtractTextPlugin.extract({
                    fallback: styleLoader,
                    use: [
                        cssLoader,
                        postCssLoader,
                        sassLoader
                    ]
                })
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
