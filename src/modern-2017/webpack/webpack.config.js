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

    babel and autoprefixer get their options from entry in package.json, other tools might share these options as well

    eslint gets its rules from .eslintrc
    "off" or 0 - turn the rule off
    "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

    prod builds
        - webpack -p from command line
            * runs minification
            * sets NODE_ENV to 'process.env.NODE_ENV': JSON.stringify('production')
                * it converts the object to a string (just like envify), https://webpack.js.org/guides/production/#node-environment-variable
            * NODE_ENV is NOT set within this config file however, so can not check against it here (without setting it again before running webpack)
            * If we want to send parameters to this config, we can do it like we are doing it here in this file and package.json
        - sending parameters into this file is a way to toggle dev/prod builds
        - another alternative is to use 2 config files, webpack.dev.config.js and webpack.prod.config.js, and use either from npm script, but that would lead to duplicate code between the two
        - a third option is to to use 3 config files: a common, a dev and a prod and then merge them. https://webpack.js.org/guides/production/#node-environment-variable
        

*/

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let isProduction;

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: !isProduction
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: !isProduction
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
        sourceMap: !isProduction
    }
};

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: !isProduction
    }
};

// instead of assigning an object to module.exports, we use a function that takes an env variable, and return an object. The env variable is used to toggle dev/prod

module.exports = (env) => {
    isProduction = env === 'production';

    console.log('isProduction: ' + isProduction);

    return {
        //entry: path.resolve(__dirname, 'src/index.js'),                                                   // 1 entry point
        entry: {                                                                                            // 2 entry points
            app: path.resolve(__dirname, 'src/index.js'),
            app2: path.resolve(__dirname, 'src/index-2.js'),
        },
        devtool: !isProduction ? 'source-map' : false,                                                      // cheap-module-eval-source-map is the faster option, but does not work with CSS
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new ExtractTextPlugin(isProduction ? '[name].[chunkhash].bundle.css' : '[name].bundle.css'),    // extract css to seperate file, instead of injecting into DOM (see loader also)
            new HtmlWebpackPlugin({
                //hash: isProduction,                                                                       // hash with query string (will be the same for all files, and hashes for all files update when 1 file change, not optimal)
                //chunks: ['app'],                                                                          // only include app.js and app.css but not app2.js and app2.css
                template: path.resolve(__dirname, 'src/index.html')                                         // copy to dist and inject scripts/css (need to handle this together with templating)
            }),
            // new HtmlWebpackPlugin, for another html file (and can include different chunks into it)

            // jQuery is included in both app.js and app2, this extracts out common code (jQuery) and puts it in common.js, common.js is injected into index.html
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),

            // OBS [name] for generated entry point file , chunkhash hashes filename and is unique to each file
            // A change will change hash for the changed file and for common (since common contains webpack boiler plate that always change)
            // Unfortunately common also includes jquery, and since common gets a new hash with every file change, the whole jQuery lib is cache busted, not optimal
            // There is a way to solve this by chunking jQuery to its own file by adding it to an entry in this config, but I think it is not really worth the trouble
            // remembering to add each library to that array. Read more here: https://webpack.js.org/guides/caching/#extracting-boilerplate
            filename: isProduction ? '[name].[chunkhash].bundle.js' : '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',                                                                     // 2) compile to ES5
                        'eslint-loader'                                                                     // 1) lint ES6
                    ]
                },
                {
                    test: /\.scss$/,
                    // use: [
                    //     'style-loader',                                                                  // 4) injects css into DOM
                    //     'css-loader',                                                                    // 3) enables import css file
                    //     postCssLoader,                                                                   // 2) post css transforms
                    //     'sass-loader'                                                                    // 1) compiles sass to css
                    // ]

                    // extract css to seperate file, instead of injecting into DOM (see plugins also)
                    use: ExtractTextPlugin.extract({
                        // fallback: styleLoader,
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
}
