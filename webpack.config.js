var path = require('path');
module.exports = {
    entry: './src/main/resources/static/App.js',
    output: {
        path: path.join(__dirname, './src/main/resources/static'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loaders: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};