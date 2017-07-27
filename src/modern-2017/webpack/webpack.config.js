var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',     // 3) injects css into DOM
                    'css-loader',       // 2) enables import css file
                    'sass-loader'       // 1) compiles sass to css
                ]
            }
        ]
    }
};
